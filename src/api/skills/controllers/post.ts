import { SkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postskills: SkillsHandlers['post'] = async (req, res, next) => {
  const { name } = req.body;

  try {
    const skills = await prisma.skills.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(skills);
  } catch (error) {
    next(error);
  }
};

export default postskills;
