import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

interface TokenPayload {
  id: string;
  username: string;
  profile: string;
  iat: number;
  exp: number;
}

const isAuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     throw new AppError("ERR_SESSION_EXPIRED", 401);
//   }

//   const [, token] = authHeader.split(" ");

  try {
    req.user = {
      id: 1,
    }
  } catch (err) {
    console.log(err);
    throw new AppError(
      "Invalid token. We'll try to assign a new one on next request",
      403
    );
  }

  return next();
};

export default isAuthenticatedMiddleware;
