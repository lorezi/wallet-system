import Joi from "joi";
import BadRequestException from "../exception/BadRequestException";

export const sampleSchema = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    type: Joi.string().min(3).required(),

    actor: Joi.object({
      login: Joi.string().min(3).required(),
      avatar_url: Joi.string().required(),
    }),

    repo: Joi.object({
      name: Joi.string().min(3).required(),
      url: Joi.string().required(),
    }),
  });

  validateRequest(req, next, schema);
};

// export const productSchema = (req: any, res: any, next: any) => {
//   const schema = Joi.object({
//     item_id: Joi.string().required(),
//     name: Joi.string().min(3).required(),
//     sku: Joi.string().required(),
//     image_name: Joi.string().required(),
//     warehouse_actual_committed_stock: Joi.number().required(),
//     sales_rate_formatted: Joi.string().required(),
//     description: Joi.string().required(),
//   });

//   validateRequest(req, next, schema);
// };

export const loginSchema = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    code: Joi.string().min(3).required(),
  });

  validateRequest(req, next, schema);
};

export const validateRequest = (req: any, next: any, schema: any) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  //   validate request body against schema
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    throw new BadRequestException(
      `Validation error: ${error.details.map((x: any) => x.message).join(", ")}`
    );
  }
  req.body = value;
  next();
};
