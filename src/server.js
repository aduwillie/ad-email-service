const Hapi = require('@hapi/hapi');

const server = Hapi.Server({
    port: process.env.PORT,
    host: '0.0.0.0',
});

module.exports = server;