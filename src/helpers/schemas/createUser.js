import Joi from 'joi';
const createUser = Joi.object({
    id: Joi.string().regex(/[A-Z]{2}[0-9]{4}/).required().messages({
        'string.empty': 'ID cannot be an empty field',
        'string.pattern.base': 'ID must be in the format AA0000000',
        'any.required': 'ID is a required field',
    }),
    name: Joi.string().min(2).required().messages({
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name must be at least 2 characters long',
        'any.required': 'Name is a required field',
    }),
    phone: Joi.string().regex(/^01[0125][0-9]{8}$/s).required().messages({
        'string.empty': 'Phone number cannot be an empty field',
        'any.required': 'Phone number is a required field',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
    }),
});
export default createUser;