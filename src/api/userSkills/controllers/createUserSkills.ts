import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const postUserSkills: UserSkillsHandlers['post'] = async (req, res, next) => {
  const { userId, skillId, note } = req.body;

  try {
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userId) {
      return res.status(401).send({
        message: 'You cannot update an other user',
        type: 'ACCES_ERROR',
      });
    }

    const userSkills = await prisma.userSkill.create({
      data: {
        userId,
        skillId,
        note,
      },
      select: {
        id: true,
        userId: true,
        skillId: true,
        note: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json(userSkills);
  } catch (error) {
    next(error);
  }
};

export default postUserSkills;
