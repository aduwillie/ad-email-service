const { validate } = require('./validations/email-opts-validator');

const wrapEmailResponse = (source, success = true, data) => {
    if (!source || typeof source !== 'string') {
        throw new Error('An email source is required.');
    }
    return {
        source,
        isSuccess: success,
        data,
    };
};

const getEmailMessageBody = (sendOpts = {}, separator = ',') => {
    // validate send Options passed
    validate(sendOpts);

    const { from, to, subject, message, cc, bcc } = sendOpts;
    const body = {
        to: formatArrayToString(to, separator),
        from,
        subject,
        text: message,
        body: message,
        body_text: message,
    };
    if (cc) {
        body.cc = this.formatArrayToString(cc, separator);
    }
    if (bcc) {
        body.bcc = this.formatArrayToString(bcc, separator);
    }

    return body;
};

const formatArrayToString = (input = [], separator = ',') => {
    if (!Array.isArray(input)) {
        throw new Error('Invalid argument passed');
    }
    return input.reduce((acc, curr) => {
        if (acc && typeof acc === 'string') {
            return `${acc}${separator} ${curr}`;
        }
        return `${curr}`;
    }, '');
}

module.exports = {
    wrapEmailResponse,
    getEmailMessageBody,
    formatArrayToString,
};
