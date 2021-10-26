import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteUserSkill: UserSkillsHandlers['delete'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    await prisma.userSkill.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteUserSkill;
