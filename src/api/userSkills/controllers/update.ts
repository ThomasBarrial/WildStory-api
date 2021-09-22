import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateUserSkills: UserSkillsHandlers['update'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { skillId, note } = req.body;
  try {
    await prisma.userSkill.update({
      where: {
        id,
      },
      data: {
        skillId,
        note,
      },
      select: {
        id: true,
        skillId: true,
        note: true,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updateUserSkills;
