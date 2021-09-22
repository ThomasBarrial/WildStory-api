import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import bcrypt from 'bcrypt';

const postUser: UserHandlers['post'] = async (req, res, next) => {
  const {
    username,
    email,
    password,
    city,
    birthDate,
    avatarUrl,
    landimageUrl,
  } = req.body;

  const handlePassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: handlePassword,
        city,
        birthDate,
        avatarUrl,
        landimageUrl,
      },
      select: {
        id: true,
        username: true,
        email: true,
        city: true,
        birthDate: true,
        avatarUrl: true,
        landimageUrl: true,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export default postUser;
