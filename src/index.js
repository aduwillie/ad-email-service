const { init } = require('./server');

init(true);

// We could plumb in a better error reporting
process.on('uncaughtException', (e) => console.err(e));
process.on('unhandledRejection', (e) => console.err(e));
