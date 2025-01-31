import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import httpStatus from "http-status";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Stationary Shop server is live and running 🏃‍♀️🏃‍♂️🏃‍♀️",
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: "Route not found !!",
  });
});

export default app;
