# Email Service

This is a Node.js backend service that abstracts out the logic for sending emails. This service provides an abstraction between Mailgun and ElasticEmail.

## Quick Start

If you have successfully run through the steps below, simply run `npm start` to spin this service up.

### Dependencies

- Docker (optional)
- Node.js v10+
- npm

#### What we need docker for

Docker is a tool that is designed to make it easier to create, deploy and run containers. As a container this service can be run against any environment that supports docker eg. Windows, MacOS and Linux.

#### What we need Node.js and npm for

This service is written using Node.js as a web framework. Hence it is needed to have node.js installed locally in order to contribute and more particularly run this service. 

Npm is a tool that comes along with Node.js. It is needed to get all project dependencies installed and working. 

### Before you begin

Since this service relies on 2 email services i.e. Mailgun and ElasticEmail, there is a need to get the respective *API Keys* and *Secrets* for these services. These should be exposed as environment variables using the following keys:

```
PORT=<port_to_run_the_app>
MAILGUN_API_KEY=<your_mailgun_api_key>
MAILGUN_DOMAIN=<your_mailgun_domain_for_sending_emails>
ELASTIC_EMAIL_API_KEY=<your_elastic_email_api_key>
ELASTIC_EMAIL_ACCOUNT_EMAIL=<your_elastic_email_account_email>
```

If you intend to use docker-compose to spin up the application, you should provide s `.env` file at the root of the project. 

### Developing locally

To start the app, simply run `npm start`. When using docker-compose, simply run `docker-compose up -d`. You can specify the service name i.e. `docker-compose -d web`.

To view logs with docker, use `docker-compose logs -f web`. For now only console logs are supported.

### Testing

To run the tests, use `npm test`.

