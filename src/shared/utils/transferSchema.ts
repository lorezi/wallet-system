import Joi from "joi";
import { validateRequest } from "./Validation";

/**
 *
 * @param req
 * @param res
 * @param next
 */
const transferSchema = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    account_no: Joi.string().required(),
    amount: Joi.number().required(),
  });

  validateRequest(req, next, schema);
};

export default transferSchema;
