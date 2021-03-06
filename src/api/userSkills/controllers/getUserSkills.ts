import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getUserSkills: UserSkillsHandlers['getUserSkills'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const userSkills = await prisma.userSkill.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        note: true,
        skillId: true,
      },
    });

    res.status(200).json(userSkills);
  } catch (err) {
    next(err);
  }
};

export default getUserSkills;
