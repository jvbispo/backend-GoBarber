import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/authConfig';

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authMiddlware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw Error('token not provided');
  }

  const [, token] = authHeader?.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);
    const { sub } = decoded as IPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Token invalid');
  }
}
