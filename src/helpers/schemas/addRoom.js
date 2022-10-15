import Joi from 'joi';
const addRoom = Joi.object({
    Description: Joi.string().min(2).required().messages({
        'string.empty': 'Discription cannot be an empty field',
        'string.min': 'Discription must be at least 2 characters long',
        'any.required': 'Discription is a required field',
    }),
    DayCost: Joi.number().greater(0).required().messages({
        'number.base': 'Day Cost must be a number',
        'number.greater': 'Day Cost must be greater than 0',
        'any.required': 'Day Cost is required',
    }),
    roomStatus: Joi.string().required().valid('available', 'reserved', 'disabled').lowercase().messages({
        'string.empty': 'Room Status cannot be an empty field',
        'any.only': 'Room Status must be one of the following: Available, Reserved, Disabled',
        'any.required': 'Room Status is a required field',
    }),
    roomType: Joi.string().required().valid('single', 'double').lowercase().messages({
        'string.empty': 'Room Type cannot be an empty field',
        'any.only': 'Room Type must be one of the following: Single, Double',
        'any.required': 'Room Type is a required field',
    }),
});
export default addRoom;