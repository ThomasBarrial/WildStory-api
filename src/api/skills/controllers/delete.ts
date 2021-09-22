import { SkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteSkills: SkillsHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.skills.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteSkills;
