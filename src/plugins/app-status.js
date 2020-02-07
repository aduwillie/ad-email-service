const Plugin = {
    name: 'app-status',
    version: '1.0.0',
    register: async (server) => {

        server.isDevelopment = process.env.NODE_ENV === 'development';
        server.isProduction = process.env.NODE_ENV === 'production';

    },
};

module.exports = Plugin;
