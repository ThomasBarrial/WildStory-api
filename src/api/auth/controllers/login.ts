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
      throw new Error('Unknow user');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401);
      throw new Error('Wrong password');
    }

    const { password: _pw, ...whithouPassword } = user;

    const token = jwt.sign(
      { username: user.username, userId: user.id, role: user.role },
      process.env.SECRET as string,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      expires: new Date(253402300000000),
      httpOnly: false,
      sameSite: 'none',
      secure: process.env.NODE_ENV !== 'development',
    });

    res.set({ 'Access-Control-Allow-Credentials': true });

    return res.status(200).json(whithouPassword);
  } catch (e) {
    res.status(400);
    return next(e);
  }
};

export default login;
