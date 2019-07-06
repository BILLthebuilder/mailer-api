const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    message: Joi.string()
        .alphanum()
        .min(3)
        .max(500)
        .required()
});


module.exports = {
    schema
}
