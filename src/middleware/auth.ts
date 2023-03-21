import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRequest } from '../interfaces/UserRequest';

const { TOKEN_SECRET } = process.env;

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  const decoded = jwt.verify(token as string, TOKEN_SECRET + '') as JwtPayload;
  if(! decoded) {
    throw new Error('Error when decoding the token');
  }
  (req as UserRequest).userId  = decoded.user.userId;
  (req as UserRequest).firstName = decoded.user.firstName;
  (req as UserRequest).lastName = decoded.user.lastName; 
  next();
}
