import { Express } from "express";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import expressRateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { config } from "dotenv";
import path from "node:path";
import authRouter from "./module/auth/auth.controller"
import userRouter from "./module/user/user.controller"
import { globalErrorHandler } from "./utils/errors/error.response";
import { connectDB } from "./DB/connection";

config({path : path.resolve('./config/.env.dev')});

const limiter: RateLimitRequestHandler = expressRateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    status: 429,
    message: "Too many requests",
  },
});

const app: Express = express();
app.set('trust proxy', true);

export const bootstrap = async (): Promise<void> => {
  const port: number | string = process.env.PORT || 5000;
  
  app.use(cors(), express.json(), helmet());
  app.use(limiter);
  
  await connectDB();
  
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use(globalErrorHandler);

  app.get('/', (req, res) => res.json({ status: 'ok' }))
    
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
};

export default app;
