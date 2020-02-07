const Logger = require('../services/logger');

const Plugin = {
    name: 'app-logger',
    version: '1.0.0',
    register: async (server) => {

        const logger = new Logger()
            .addConsole();

        server.app.Logger = logger;

    },
};

module.exports = Plugin;
