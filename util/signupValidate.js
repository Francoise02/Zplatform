import Joi from 'joi';

export const signupAuthSchema = Joi.object({
    nationality: Joi.string().alphanum().required(),

    firstName: Joi.string().alphanum().required(),

    lastName: Joi.string().alphanum().required(),

    Age: Joi.number(),

    phoneNumber: Joi.string()
        .regex(/^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
        .messages({ 'string.pattern.base': `Enter phone number with country code` })
        .required(),

    maritalStatus: Joi.string(),

    gender: Joi.string(),

    password: Joi.string()
        .min(8)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required(),

    repeat_password: Joi.ref('password'),

    email: Joi.string().lowercase().email().required(),
});
