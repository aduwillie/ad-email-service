const server = require('./server');
const Plugins = require('./plugins');
const Routes = require('./routes');

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

// We could plumb in a better error reporting
process.on('uncaughtException', console.err);
process.on('unhandledRejection', console.err);

init(true);
