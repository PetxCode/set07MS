import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verified = async (req: any, res: Response, next: NextFunction) => {
  try {
    const fakeToken = req.headers.authorization;

    if (fakeToken) {
      const token = fakeToken.split(" ")[1];

      if (token) {
        jwt.verify(token, "tokenSecret", (error: any, payload: any) => {
          if (error) {
            return res.status(404).json({
              message: "Token Error",
            });
          } else {
            req.user = payload;
            next();
          }
        });
      } else {
        return res.status(404).json({
          message: "Invalid Token",
        });
      }
    } else {
      return res.status(404).json({
        message: "you can't do this",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
