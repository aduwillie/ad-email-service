const AppStatusPlugin = require('./app-status');
const AppEmailPlugin = require('./app-email');
const AppLoggerPlugin = require('./app-logger');

module.exports = [
    AppLoggerPlugin,
    AppStatusPlugin,
    AppEmailPlugin,
];
