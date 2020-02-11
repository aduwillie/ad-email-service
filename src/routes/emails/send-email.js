const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

module.exports = {
    method: 'POST',
    path: '/v1/email',
    options: {
        validate: {
            payload: Joi.object({
                message: Joi.string().required(),
                subject: Joi.string().required(),
                from: Joi.string().required(),
                to: Joi.array().items(Joi.string().email()).required(),
                cc: Joi.array().items(Joi.string().email()).optional(),
                bcc: Joi.array().optional(),
            }),
        },
        handler: async (request) => {
            const { isProduction } = request.server;
            const { Mailgun, ElasticEmail } = request.server.app;

            let msg;
            // Stating with mailgun
            const response = await Mailgun.send(request.payload);
            if (response.isSuccess) {
                msg = response;
            } else{
                // Falling back to elastic email
                console.error(msg);
                msg = await ElasticEmail.send(request.payload);
            }
            
            // handle error scenarios
            if (!msg.isSuccess) {
                if (isProduction) {
                    throw Boom.internal(msg.data.message);
                } else {
                    console.error(msg);
                    throw Boom.internal(msg);
                }
            }

            console.log(msg);
            return 'Ok';
        },
    },
};
