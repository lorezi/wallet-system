import { NextFunction, Response } from "express";
import { handleSuccess } from "../../shared/utils/responseHandler";
import { UserService } from "../services/user.service";

export default class UserController {
  public static async create(req: any, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body);
      return handleSuccess(201, "user created", user, req, res);
    } catch (e) {
      next(e);
    }
  }

  public static async verify(req: any, res: Response, next: NextFunction) {
    try {
      const otp = await UserService.findByOTP(req.body.otp);
      return handleSuccess(200, "OTP verified", otp, req, res);
    } catch (e) {
      next(e);
    }
  }

  public static async generateOTP(req: any, res: Response, next: NextFunction) {
    try {
      const otp = await UserService.generateOTP(req.body.otp);
      return handleSuccess(201, "new OTP generated", otp, req, res);
    } catch (e) {
      next(e);
    }
  }

  public static async transfer(req: any, res: Response, next: NextFunction) {
    try {
      const data = await UserService.transfer(req.body);
      return handleSuccess(200, "transfer was successful", data, req, res);
    } catch (e) {
      next(e);
    }
  }
}
