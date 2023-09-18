import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { openingMail } from "../utils/email";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const token = jwt.sign({ hashed }, "starting");

    const user = await prisma.authModel.create({
      data: {
        userName,
        email,
        password: hashed,
        token,
        store: [],
      },
    });

    openingMail(user).then(() => {
      console.log("Mail Sent...");
    });

    return res.status(201).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await prisma.authModel.findUnique({
      where: {
        id: userID,
      },
    });

    if (user?.token !== "") {
      const userData = await prisma.authModel.update({
        where: { id: user?.id },
        data: {
          verified: true,
          token: "",
        },
      });

      return res.status(201).json({
        message: "user verified",
        data: userData,
      });
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.authModel.findUnique({
      where: { email },
    });

    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        if (user.verified && user.token === "") {
          const token = jwt.sign({ id: user.id }, "tokenSecret");

          req.headers.authorization = `Bearer ${token}`;

          return res.status(201).json({
            message: "welcome",
            data: token,
          });
        } else {
          return res.status(404).json({
            message: "user haven't been verified",
          });
        }
      } else {
        return res.status(404).json({
          message: "wrong password",
        });
      }
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.authModel.findMany({});

    return res.status(200).json({
      message: "all user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await prisma.authModel.findUnique({
      where: { id: userID },
    });

    return res.status(200).json({
      message: "user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
