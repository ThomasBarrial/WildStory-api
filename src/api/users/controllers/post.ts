import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import bcrypt from 'bcrypt';

const postUser: UserHandlers['post'] = async (req, res, next) => {
  let formation;
  const {
    username,
    email,
    password,
    city,
    birthDate,
    avatarUrl,
    landimageUrl,
    idFormation,
  } = req.body;

  const handlePassword = bcrypt.hashSync(password, 10);

  try {
    if (idFormation) {
      formation = {
        connect: {
          id: idFormation,
        },
      };
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: handlePassword,
        city,
        birthDate,
        avatarUrl,
        landimageUrl,
        formation,
      },
      select: {
        id: true,
        username: true,
        email: true,
        city: true,
        birthDate: true,
        avatarUrl: true,
        landimageUrl: true,
        idFormation: true,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(422);
    next(err);
  }
};

export default postUser;
