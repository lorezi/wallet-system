import Joi from "joi";
import { validateRequest } from "./Validation";

const otpSchema = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    otp: Joi.string().min(4).max(4).required(),
  });

  validateRequest(req, next, schema);
};

export default otpSchema;
