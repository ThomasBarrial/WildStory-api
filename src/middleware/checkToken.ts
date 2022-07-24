/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function checkToken(req: any, res: Response, next: NextFunction): void {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error('You need to login.');
    }

    req.user = jwt.verify(token, process.env.SECRET as string);

    return next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
}

export default checkToken;
