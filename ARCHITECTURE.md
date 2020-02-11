# The Email Service API

This is the API provided to consumers (preferably devs) in order to send email. The service relies on Mailgun HTTP API and Elastic Email HTTP API. It is built in Node.js and implements simple REST. As the API is not fully documented, you can explore this file to get a sense of the architecture.

## Introduction

The core value of the service is to provide an email service. The service is an abstraction over 2 popular email providers i.e. Mailgun and Elastic Email. Mailgun is designated as the primary provider whereas Elastic Email is used as fallback.

## Choice

This is application is built as a simple *Node.js* app based off on *Hapi.js*. The decision to go with hapi.js and its ecosystem of tools is based on its opinionated nature and high security provided. The following were the reasons for choosing hapi.js:

- Code readability: Code readability requires that code should be simple, secure and maintainable even as it grows in size. For me, when readability and performance are in conflict, I would pick readability. Hence changes do not require complex and messy solutions.
- Dependencies: Hapi.js is arguably the only micro web framework that comes with no (or just one) dependencies at its core. Every aspect of it is actively maintained.
- Extensibility/Customization: Concepts such as framework plugins, request lifecycle, server methods and user extensions are heavily supported with hapi. Hence, making it one of the most customizable frameworks around.

## Constraints

This architecture satisfies the following constraints:

- The service should be deployed over the web.
- No external third-party dependencies are needed to connect to Mailgun and Elastic Email
- All inputs should be validated

## System Design

The system comprises of a single backend service. It exposes a single route (/v1/email/send) that accepts the following inputs

- message: The email message being sent.
- subject: The subject of the email being sent.
- from: The email of the sender.
- to: An array of the recipients of the email.
- cc: An array of the recipients to be copied on the email.
- bcc: An array of the recipients to be blindly copied on the email.

An initial REST API call is sent to Mailgun. If successfull, an status code of 200 is forwarded to the caller. If an error of any sort occurs, it is logged and another call is initiated to Elastic Email. Similar to the Mailgun requests, if successful, a 200 is sent to the caller.

In any error scenario, a 500 is returned where a 400 status code is returned for a failed input validation.

## Potential Improvements

### Audit logging

As of the initial implementation, when a service goes down before it resolves a request, there is no audit trail. The user is only left with a 500 status code with little audit trail needed to support debugging in production.

A useful approach would be to attach a unique UUID to every request that is attached to every request. This would become a single point for tracing and audit trailing.

#### Queueing 

The assumption as of this naive implementation is that, Mailgun and Elastic Email would return an immediate result and using their dashboards, we could trace and debug accordingly.However, this approach is limiting and does not give enough context about how a user relates to an error message. 

An approach would be to queue all user requests. These queues would have a uniqueu ID generated and shared with the user. The user would then be required to go through a second route in order to view the status of the request. A worker would be needed in order to process these requests and proper logging and tracing can be added as needed.

#### Typescript

The current design is implemented in JavaScript. By leveraging TypeScript, we position ourselves to scale the codebase and improve on the quality of the codebase itself.

#### Testing

Not much tests have been added to this repo due to time contraints. However, implementing a full suite of unit and integration tests improves on the robustness of this repo.

#### Logging

Logging in general should be centralized. As of this implementation, logging goes through the stdout via console. This is not useful as not much monitoring can be gleaned. It would be preferable to use the `server.log` and `request.log` features of Hapi.js to centralize logging.
