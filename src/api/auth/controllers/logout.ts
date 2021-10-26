import { AuthHandler } from '../interface';

const logout: AuthHandler['logout'] = (req, res, next) => {
  try {
    if (!req.cookies?.token) {
      return res.status(403).json({ message: 'User not logged out. ' });
    }
    res.clearCookie('token');
  } catch (e) {
    res.status(400);
    return next(e);
  }
};

export default logout;
