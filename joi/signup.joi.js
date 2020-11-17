const Joi = require('@hapi/joi');

function userRegsiterValidation(user) {

    const regsiterSchema = Joi
        .object(
            {
                name: Joi.string().min(3).max(255).required(),
                email: Joi.string().min(3).max(255).required().email(),
                password: Joi.string().min(3).max(255).required()
            })
        .options(
            {
                abortEarly: false
            }
        );

    return regsiterSchema.validate(user);
}

function userLoginValidation(user) {

    const loginSchema = Joi
        .object(
            {
                email: Joi.string().min(3).max(255).required().email(),
                password: Joi.string().min(3).max(255).required()
            })
        .options(
            {
                abortEarly: false
            }
        );

    return loginSchema.validate(user);
}

module.exports.userRegsiterValidation = userRegsiterValidation;
module.exports.userLoginValidation = userLoginValidation;