const Request = require('request-promise');
const { MAILGUN } = require('../constants');
const { 
    getEmailMessageBody,
    wrapEmailResponse,
} = require('../utils');

class MailGun {
    constructor(apiKey, domain) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('No API Key for Mailgun provided.');
        }
        if (domain && typeof domain !== 'string') {
            throw new Error('Please specify a valid domain.');
        }

        this.apiKey = apiKey;
        this.domain = domain || 'samples.mailgun.org'; // fallback to using default samples
    }

    async send(sendOpts = {}) {
        try {
            const response = await Request({
                method: 'POST',
                uri: `https://api:${this.apiKey}@api.mailgun.net/v3/${this.domain}/messages`,
                form: getEmailMessageBody(sendOpts, ','),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                json: true,
            });
            return wrapEmailResponse(MAILGUN, true, response);
        } catch (error) {
            return wrapEmailResponse(MAILGUN, false, error);
        }
    }
}

module.exports = MailGun;
