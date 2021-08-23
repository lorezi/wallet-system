import { NextFunction, Request, Response } from "express";

/**
 * @method handleSuccess
 * @description custom success response handler
 * @param code
 * @param message
 * @param data
 * @param request
 * @param response
 * @param meta
 * @param next
 */

export const handleSuccess = (
  code: number,
  message: string,
  data: any,
  request: Request,
  response: Response,
  meta?: any,
  next?: NextFunction
) => {
  response.status(code).json({
    status: "success",
    message,
    data,
    meta,
  });
};

/**
 * @method handleFailure
 * @description custom error response handler
 * @param code
 * @param message
 * @param data
 * @param request
 * @param response
 * @param meta
 * @param next
 */
export const handleFailure = (
  code: number,
  message: string,
  data: any,
  request: Request,
  response: Response,
  meta?: any,
  next?: NextFunction
) => {
  response.status(code).json({
    status: "failed",
    message,
    data,
    meta,
  });
};
