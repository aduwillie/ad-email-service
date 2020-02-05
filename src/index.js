const server = require('./server');

const init = async (shouldStart) => {
    await server.initialize();
    console.log('Server initialized');

    if (shouldStart) {
        await server.start();
        console.log(`Server started at: ${server.info.uri}`);
    }

    return server;
};

// We could plumb in a better error reporting
process.on('uncaughtException', (err) => console.err);
process.on('unhandledRejection', (err) => console.err);

init(true);
