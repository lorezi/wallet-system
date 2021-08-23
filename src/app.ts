require("dotenv").config();
import express, { RequestHandler } from "express";
import cors from "cors";
import { routerBase } from "./modules/routes";
import errorMiddleware from "./shared/middlewares/errorHandler";
import NotFoundException from "./shared/exception/NotFoundException";
import helmet from "helmet";

const app = express();
const api = "/api/v1";

app.enable("trust proxy");

// Set security HTTP headers
app.use(helmet() as RequestHandler);

// Body parser, reading data from the body into req.body
// middleware ===> modifies the request
app.use(express.json({ limit: "10kb" }) as RequestHandler);
app.use(
  express.urlencoded({ extended: true, limit: "10kb" }) as RequestHandler
);

app.use(`${api}/`, routerBase);
app.use(cors());

app.all("*", (req, _res, next) => {
  next(new NotFoundException(`Can't find ${req.originalUrl} on this server!'`));
});

app.use(errorMiddleware);

export default app;
