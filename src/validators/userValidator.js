const Joi = require('joi');

const emailSchema = Joi.string().required().email().min(3).max(30);
const genderSchema = Joi.string().valid("man", "woman").required();
const accountType = Joi.string().valid("mike", "guest").required();

const passwordSchema = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).required().max(20);
const nameSchema = Joi.string().alphanum().min(3).required().max(30);
const firstNameSchema = Joi.string().alphanum().min(3).required().max(30);

const birthDateSchema = Joi.date().min('1-1-1900').max('1-1-2013').required();
const phoneMobileSchema = Joi.string().regex(
    // Availabile phone nuber formats:
    // 0123456789
    // 01 23 45 67 89
    // 01.23.45.67.89
    // 0123 45.67.89
    // 0033 123 - 456 - 789
    // + 33 - 1.23.45.67.89
    // + 33 - 123 456 789
    // + 33(0) 123 456 789
    // + 33(0)123 45 67 89
    // + 33(0)1 2345 - 6789
    // + 33(0) - 123456789
    /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$$/
).required().max(50);

const streetSchema = Joi.string().min(3).required().max(30);
const citySchema = Joi.string().min(3).required().max(30);
const postcodeSchema = Joi.string().min(3).required().max(30);
const countrySchema = Joi.string().min(3).required().max(30);

const addressSchema = Joi.object().required().keys({
    street: streetSchema,
    city: citySchema,
    postcode: postcodeSchema,
    country: countrySchema
});

const ratingSchema = Joi.number().integer().min(1).max(5).default(5)

const userSchema = Joi.object().keys({

    email: emailSchema,
    gender: genderSchema,
    account_type: accountType,

    last_name: nameSchema,
    first_name: firstNameSchema,
    birth_date: birthDateSchema,

    password: passwordSchema,
    phone_mobile: phoneMobileSchema,
    address: addressSchema,

    rating: ratingSchema

});

module.exports = userSchema;