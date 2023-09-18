import express, { Application, Request, Response } from "express";
import cors from "cors";
import store from "./router/productRouter";

const app: Application = express();
const port: number = 3355;

app.use(cors());
app.use(express.json());

app.use("/api", store);

app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Awesome Store",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
});

app.listen(port, () => {
  console.log();
  console.log("store service connected");
});
