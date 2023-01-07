import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Config } from '../config/config';

export const SECRET_KEY: Secret = Config.JWT_SECRET;

export interface CustomRequest extends Request {
  auth: string | JwtPayload;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Invalid token');
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    (req as CustomRequest).auth = decoded;

    next();
  } catch (err) {
    res.status(401).send({ success: false, message: 'Authentication Failed' });
  }
};
