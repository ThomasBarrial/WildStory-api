import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

function checkRole(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  try {
    const { token } = req.cookies;

    if (typeof token === 'undefined') {
      throw new Error('You need to login.');
    }

    const jwtPayload = verify(token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.role !== 'ADMIN') {
      throw new Error('Only administrators can acces this ressource');
    }

    return next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
}

export default checkRole;
