import { SkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getOne: SkillsHandlers['getOne'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skill = await prisma.skills.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(skill);
  } catch (error) {
    next(error);
  }
};

export default getOne;
