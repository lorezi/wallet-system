import { userRoutes } from "./user.routes";

import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import otpSchema from "../../shared/utils/otpSchema";
import transferSchema from "../../shared/utils/transferSchema";

const router = express.Router();

router.use("/signup", userRoutes);
router.patch("/verify", otpSchema, UserController.verify);
router.patch("/generate", otpSchema, UserController.generateOTP);
router.patch("/transfer", transferSchema, UserController.transfer);

export const routerBase: Router = router;
