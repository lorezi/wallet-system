import Joi from "joi";
import { validateRequest } from "./Validation";

const userSchema = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    fullname: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
    phone_no: Joi.string().min(11).required(),
    email: Joi.string().required(),
  });

  validateRequest(req, next, schema);
};

export default userSchema;
