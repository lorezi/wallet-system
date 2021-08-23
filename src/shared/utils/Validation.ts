import BadRequestException from "../exception/BadRequestException";

/**
 *
 * @param req
 * @param next
 * @param schema
 */
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
