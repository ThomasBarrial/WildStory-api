import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postUserSkills: UserSkillsHandlers['post'] = async (req, res, next) => {
  const { userId, skillId, note } = req.body;

  try {
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
