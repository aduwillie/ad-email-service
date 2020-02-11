const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');

const Plugins = require('./plugins');
const Routes = require('./routes');

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

const init = async (shouldStart) => {
    await server.initialize();
    console.log('Server initialized');

    // register all plugins
    await server.register(Plugins);

    // register all routes
    server.route(Routes);

    if (shouldStart) {
        await server.start();
        console.log(`Server started at: ${server.info.uri}`);
    }

    return server;
};

module.exports = {
    init,
};
