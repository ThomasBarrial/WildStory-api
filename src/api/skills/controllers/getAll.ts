import { SkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: SkillsHandlers['getAll'] = async (req, res, next) => {
  try {
    const skills = await prisma.skills.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

export default getAll;
