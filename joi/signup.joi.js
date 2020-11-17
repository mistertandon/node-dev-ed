const Joi = require('@hapi/joi');

function userRegsiterSchema(user) {

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

module.exports.userRegsiterSchema = userRegsiterSchema;