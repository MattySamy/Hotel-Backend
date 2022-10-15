import Joi from 'joi';
const createCreditCard = Joi.object({
    customerId: Joi.string().regex(/[A-Z]{2}[0-9]{4}/).required().messages({
        'string.empty': 'Customer ID cannot be an empty field',
        'string.pattern.base': 'Customer ID must be in the format AA0000000',
        'any.required': 'Customer ID is a required field',
    }),
    creditType: Joi.string()
        .required()
        .valid(
            'mastercard',
            'visa',
            'americanexpress',
            'dinersclub',
            'discover',
            'jcb',
        )
        .lowercase()
        .messages({
            'string.empty': 'Credit type is required',
            'any.only': 'Credit type must be one of the following: mastercard, visa, American Express, Diners Club, Discover, jcb',
        }),
    mastercard: Joi.alternatives().conditional('creditType', {
        is: 'mastercard',
        then: Joi.string()
            .required()
            .regex(
                /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
            )
            .messages({
                'string.empty': 'Mastercard number is required',
                'string.pattern.base': 'Mastercard number is invalid',
            }),
        otherwise: Joi.forbidden(),
    }),
    visa: Joi.alternatives().conditional('creditType', {
        is: 'visa',
        then: Joi.string()
            .required()
            .regex(/^4[0-9]{12}(?:[0-9]{3})?$/)
            .messages({
                'string.empty': 'Visa number is required',
                'string.pattern.base': 'Visa number is invalid',
            }),
    }),
    americanexpress: Joi.alternatives().conditional('creditType', {
        is: 'americanexpress',
        then: Joi.string()
            .required()
            .regex(/^3[47][0-9]{13}$/)
            .messages({
                'string.empty': 'American Express number is required',
                'string.pattern.base': 'American Express number is invalid',
            }),
    }),
    dinersclub: Joi.alternatives().conditional('creditType', {
        is: 'dinersclub',
        then: Joi.string()
            .required()
            .regex(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/)
            .messages({
                'string.empty': 'Diners Club number is required',
                'string.pattern.base': 'Diners Club number is invalid',
            }),
    }),
    discover: Joi.alternatives().conditional('creditType', {
        is: 'discover',
        then: Joi.string()
            .required()
            .regex(/^6(?:011|5[0-9]{2})[0-9]{12}$/)
            .messages({
                'string.empty': 'Discover number is required',
                'string.pattern.base': 'Discover number is invalid',
            }),
    }),
    jcb: Joi.alternatives().conditional('creditType', {
        is: 'jcb',
        then: Joi.string()
            .required()
            .regex(/^(?:2131|1800|35\d{3})\d{11}$/)
            .messages({
                'string.empty': 'jcb number is required',
                'string.pattern.base': 'jcb number is invalid',
            }),
    }),
    creditNumber: Joi.string()
        .valid(
            Joi.ref('mastercard'),
            Joi.ref('visa'),
            Joi.ref('americanexpress'),
            Joi.ref('dinersclub'),
            Joi.ref('discover'),
            Joi.ref('jcb'),
        )
        .messages({
            'string.empty': 'Credit number is required',
            'any.only': 'Credit number is invalid',
        }),
    expiryDate: Joi.string()
        .required()
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
        .messages({
            'string.empty': 'Expiration date is required',
            'string.pattern.base': 'Expiration date is invalid',
        }),
    cvv: Joi.string()
        .required()
        .regex(/^[0-9]{3,4}$/)
        .messages({
            'string.empty': 'CVV is required',
            'string.pattern.base': 'CVV is invalid',
        }),
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({ 'string.empty': 'Name is required' }),
    address: Joi.string()
        .required()
        .messages({ 'string.empty': 'Address is required' }),
    city: Joi.string()
        .required()
        .messages({ 'string.empty': 'City is required' }),
    state: Joi.string()
        .required()
        .messages({ 'string.empty': 'State is required' }),
    zip: Joi.string()
        .regex(/^[0-9]{5}(?:-[0-9]{4})?$/)
        .required()
        .messages({
            'string.empty': 'Zip code is required',
            'string.pattern.base': 'Zip code is invalid',
        }),
    country: Joi.string()
        .required()
        .messages({
            'string.empty': 'Country is required'
        }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid',
    }),
    balance: Joi.number().required().messages({
        'number.base': 'Balance must be a number',
    }),
});
export default createCreditCard;
//creditNumber here is the credit card number but repeated