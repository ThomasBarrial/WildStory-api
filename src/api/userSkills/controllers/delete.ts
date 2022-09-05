import { UserSkillsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const deleteUserSkill: UserSkillsHandlers['delete'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const userSkilltoDelete = await prisma.userSkill.findFirst({
      where: {
        id,
      },
    });
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userSkilltoDelete?.userId) {
      return res.status(401).send({
        message: 'You can not delete this ressource for an other user',
        type: 'ACCES_ERROR',
      });
    }

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
