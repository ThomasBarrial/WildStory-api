import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getUserSkills: UserSkillsHandlers['getUserSkills'] = async (
  req,
  res,
  next
) => {
  const { userId } = req.params;
  try {
    const userSkills = await prisma.userSkill.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        skillId: true,
        note: true,
      },
    });

    res.status(200).json(userSkills);
  } catch (error) {
    next(error);
  }
};

export default getUserSkills;
