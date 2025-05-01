import Joi from 'joi';

export const depositSchema = Joi.object({
  accountNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.base': 'Account number must be a string',
      'string.empty': 'Account number is required',
      'string.pattern.base': 'Account number must be a 10-digit number',
      'any.required': 'Account number is required'
    }),

    amount: Joi.number()
    .strict()
    .min(100)
    .precision(2)
    .required()
    .messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Minimum deposit amount is ₦50',
      'any.required': 'Amount is required'
    })
});

export const withdrawalSchema = Joi.object({
  accountNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.base': 'Account number must be a string',
      'string.empty': 'Account number is required',
      'string.pattern.base': 'Account number must be a 10-digit number',
      'any.required': 'Account number is required'
    }),

    amount: Joi.number()
    .strict()
    .min(100)
    .precision(2)
    .required()
    .messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Minimum withdrwal amount is ₦50',
      'any.required': 'Amount is required'
    })
});

export const transferSchema = Joi.object({
  fromAccountNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.base': 'From account number must be a string',
      'string.empty': 'From account number is required',
      'string.pattern.base': 'From account number must be a 10-digit number',
      'any.required': 'From account number is required'
    }),

    toAccountNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.base': 'To account number must be a string',
      'string.empty': 'To account number is required',
      'string.pattern.base': 'To account number must be a 10-digit number',
      'any.required': 'To account number is required'
    }),

    amount: Joi.number()
    .strict()
    .min(100)
    .precision(2)
    .required()
    .messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Minimum withdrwal amount is ₦50',
      'any.required': 'Amount is required'
    })
});


