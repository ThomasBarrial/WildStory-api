import { SkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateSkills: SkillsHandlers['put'] = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await prisma.skills.update({
      where: {
        id,
      },
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updateSkills;
