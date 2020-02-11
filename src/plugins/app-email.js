const MailGun = require('../services/mailgun');
const ElasticEmail = require('../services/elastic-email');

const Plugin = {
    name: 'app-service',
    version: '1.0.0',
    register: async (server) => {

        server.app.Mailgun = new MailGun(
            process.env.MAILGUN_API_KEY || 'fake',
            process.env.MAILGUN_DOMAIN || 'fake',
        );

        server.app.ElasticEmail = new ElasticEmail(
            process.env.ELASTIC_EMAIL_ACCOUNT_EMAIL || 'fake@email.com',
            process.env.ELASTIC_EMAIL_API_KEY || 'fake',
        );

    },
};

module.exports = Plugin;
