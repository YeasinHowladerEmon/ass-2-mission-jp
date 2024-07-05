import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const app: Application = express();

app.use(cors());

//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application
app.use("/api", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found"
  });
  next();
});

export default app;
