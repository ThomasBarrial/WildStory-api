import { prisma } from '../../prisma/prismaClient';
import bcrypt from 'bcrypt';
import { UserHandlers } from 'env';

const createAdmin: UserHandlers['post'] = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: process.env.USER_EMAIL,
    },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        username: process.env.USER_USERNAME as string,
        profilTitle: process.env.USER_PROFILTITLE as string,
        email: process.env.USER_EMAIL as string,
        password: bcrypt.hashSync(process.env.USER_PASSWORD as string, 10),
        city: process.env.USER_CITY,
        birthDate: process.env.USER_BIRTHDATE as string,
        role: 'ADMIN',
        avatarUrl: process.env.USER_AVATAR_URL,
        landimageUrl: process.env.USER_LANDING_URL,
        idFormation: null,
      },
    });

    // eslint-disable-next-line no-console
    console.log(`Created new user with email ${process.env.USER_EMAIL}`);
  }
};

export default createAdmin;
