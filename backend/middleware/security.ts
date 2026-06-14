import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Express } from "express";

export function security(app: Express): void {
  app.use(helmet());

  app.use(cors({
    origin: "*"
  }));

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500
  }));
}