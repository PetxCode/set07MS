import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { channel, myConnection } from "../utils/connection";
import amqp from "amqplib";

const amqpServer = "amqp://localhost:5672";

const prisma = new PrismaClient();

export const createProduct = async (req: any, res: Response) => {
  try {
    const { title, description, price } = req.body;

    const { id } = req.user;

    const product = await prisma.storeModel.create({
      data: {
        title,
        description,
        price,
        userID: id,
      },
    });

    myConnection("gets", product);

    return res.status(201).json({
      message: "product created",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const viewProducts = async (req: Request, res: Response) => {
  try {
    const product = await prisma.storeModel.findMany({});

    return res.status(200).json({
      message: "products",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const viewProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    const product = await prisma.storeModel.findUnique({
      where: {
        id: productID,
      },
    });

    return res.status(200).json({
      message: "product",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
