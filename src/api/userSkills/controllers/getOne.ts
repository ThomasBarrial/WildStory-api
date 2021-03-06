import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getOne: UserSkillsHandlers['getOne'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skill = await prisma.userSkill.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        userId: true,
        skillId: true,
        note: true,
      },
    });

    res.status(200).json(skill);
  } catch (error) {
    next(error);
  }
};

export default getOne;
