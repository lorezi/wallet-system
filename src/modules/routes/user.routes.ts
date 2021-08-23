import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import userSchema from "../../shared/utils/userSchema";

const router = express.Router();

router.post("/", userSchema, UserController.create);

export const userRoutes: Router = router;
