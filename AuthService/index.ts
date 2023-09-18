import express, { Application, Request, Response } from "express";
import cors from "cors";
import auth from "./router/authRouter";
import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";
import { myConnection } from "./utils/connection";

const amqpServer = "amqp://localhost:5672";

const prisma = new PrismaClient();

const app: Application = express();
const port: number = 3344;

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());

app.use("/api", auth);

app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Awesome",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
});

// const myConnection = async (queue: string) => {
//     try {
//      const connect = await amqp.connect(amqpServer);
//      const channel = await connect.createChannel();

//       await channel.assertQueue(queue);

//       channel.consume(queue, async (message: any) => {
//         let res = JSON.parse(message.content.toString());

//         const user = await prisma.authModel.findUnique({
//           where: { id: res?.userID },
//         });

//         console.log(user);
//       });
//       channel.ack(queue);
//     } catch (error) {
//       console.log("error connecting...");
//     }
//   };

myConnection("gets");

app.listen(port, () => {
  console.log();
  console.log("auth seervices connected");
});
