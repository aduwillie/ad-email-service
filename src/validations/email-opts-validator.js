const Joi = require('@hapi/joi');

const validate = (obj) => {
    Joi.assert(obj, Joi.object({
        message: Joi.string().required(),
        subject: Joi.string().required(),
        from: Joi.string().required(),
        to: Joi.array().items(Joi.string().email()).required(),
        cc: Joi.array().items(Joi.string().email()).optional(),
        bcc: Joi.array().optional(),
    }));
};

module.exports = {
    validate
};
