import Joi from "joi";

export const createAccountSchema = Joi.object({
  type: Joi.string()
    .valid("SAVINGS", "CURRENT")
    .required()
    .messages({
      "any.only": "Account type must be either SAVINGS or CURRENT",
      "any.required": "Account type is required"
    })
});



