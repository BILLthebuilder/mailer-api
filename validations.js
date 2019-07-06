const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    Email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    Message: Joi.string()
        .alphanum()
        .min(3)
        .max(500)
        .required(),
    Name: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required()
});


module.exports = {
    schema
}
