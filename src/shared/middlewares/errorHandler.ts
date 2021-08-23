import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";

/**
 * @method  errorMiddleware
 * @description errorhandler middleware to return  custom errors and catch errors
 * @param error
 * @param request
 * @param response
 * @param next
 */
function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const code = error.code || 500;
  const message = error.message || "Something went wrong 🥵";
  response.status(code).json({
    status: "failed",
    message,
  });
}

export default errorMiddleware;
