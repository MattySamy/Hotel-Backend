import Joi from 'joi';
const reserveRoom = Joi.object({
    roomId: Joi.number().required().messages({
        'number.base': 'Room ID must be a number',
        'any.required': 'Room ID is a required field',
    }),
    customerId: Joi.string().regex(/[A-Z]{2}[0-9]{4}/).required().messages({
        'string.empty': 'Customer ID cannot be an empty field',
        'string.pattern.base': 'Customer ID must be in the format AA0000000',
        'any.required': 'Customer ID is a required field',
    }),
    startAt: Joi.date().iso().required().messages({
        'date.base': 'Start date must be a date',
        'date.isoDate': 'Start date must be in ISO format',
        'any.required': 'Start date is a required field',
    }),
    endAt: Joi.date().iso().messages({
        'date.base': 'End date must be a date',
        'date.isoDate': 'End date must be in ISO format',
    }),
});
export default reserveRoom;