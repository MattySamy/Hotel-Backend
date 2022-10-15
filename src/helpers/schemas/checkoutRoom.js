import Joi from 'joi';
const checkoutRoom = Joi.object({
    roomId: Joi.number().required().messages({
        'number.base': 'Room ID must be a number',
        'any.required': 'Room ID is a required field',
    }),
    customerId: Joi.string().regex(/[A-Z]{2}[0-9]{4}/).required().messages({
        'string.empty': 'Customer ID cannot be an empty field',
        'string.pattern.base': 'Customer ID must be in the format AA0000000',
        'any.required': 'Customer ID is a required field',
    }),
    Feedback: Joi.string().min(5).messages({
        'string.empty': 'Feedback cannot be an empty field',
    }),
    startAt: Joi.date().iso().required().messages({
        'date.base': 'Start date must be a date',
        'date.isoDate': 'Start date must be in ISO format',
        'any.required': 'Start date is a required field',
    }),
    endAt: Joi.date().iso().default(Date.now)
});
export default checkoutRoom;