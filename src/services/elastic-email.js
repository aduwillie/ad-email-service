const Request = require('request-promise');
const { ELASTIC_EMAIL } = require('../constants');
const { 
    getEmailMessageBody,
    wrapEmailResponse 
} = require('../utils');

class ElasticEmail {
    constructor(accountEmail, apiKey) {
        this.accountEmail = accountEmail;
        this.apiKey = apiKey;
    }

    async send(sendOpts = {}) {
        try {
            const formBody = getEmailMessageBody(sendOpts, ';');
            formBody.username = this.accountEmail;
            formBody.api_key = this.apiKey;
            const response = await Request({
                method: 'POST',
                uri: 'https://api.elasticemail.com/v2/email/send',
                form: formBody,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                json: true,
            });
            return wrapEmailResponse(ELASTIC_EMAIL, true, response);
        } catch (error) {
            console.log(error);
            return wrapEmailResponse(ELASTIC_EMAIL, false, error);
        }
    }
}

module.exports = ElasticEmail;
