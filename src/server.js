const Hapi = require('@hapi/hapi');

const server = Hapi.Server({
    port: process.env.PORT,
    host: '0.0.0.0',
    routes: {
        validate: {
            failAction: async (request, _, error) => {
                if (request.server.isProduction) {
                    console.log(`Validation Error: ${error.message}`);
                    throw Boom.badRequest('Invalid request payload input');
                }
                console.error(error);
                throw error;
            },
        },
    },
});

module.exports = server;
