import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../../prisma/prismaClient';
import { AuthHandler } from '../interface';

const login: AuthHandler['login'] = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401);
      throw new Error('Wrong password');
    }

    const { password: _pw, ...whithouPassword } = user;

    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET as string
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });

    return res.status(200).json(whithouPassword);
  } catch (e) {
    res.status(400);
    return next(e);
  }
};

export default login;
