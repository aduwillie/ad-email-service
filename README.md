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

## Playground

A sanbox version of the service in action is hosted at http://ad-email.herokuapp.com/. To play with the service, the following samples can be useful.

*NB: Don't forget to replace the <from_email_address> and <to_email_address> and any other relevant detail as you wish. Also email might end up in SPAM folder.*

### Using CURL

```Curl
curl -X POST \
    http://ad-email.herokuapp.com/v1/email \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
        "message": "A test message",
        "subject": "Test Subject",
        "from": "<from_email_address>",
        "to": [ "to_email_address" ]
}'
```

### Using JavaScript XHR

```Javascript
var data = JSON.stringify({
  "message": "A test message",
  "subject": "A test subject",
  "from": "<from_email_address>",
  "to": [
    "<to_email_address>"
  ]
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://ad-email.herokuapp.com/v1/email");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "f9107c33-79f7-7c58-a5bc-2877cc043795");

xhr.send(data);
```

### Using GO

```Go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "http://ad-email.herokuapp.com/v1/email"

	payload := strings.NewReader("{\n\t\"message\": \"A test message\",\n\t\"subject\": \"Heroku\",\n\t\"from\": \"<from_email_address>\",\n\t\"to\": [ \"<to_email_address>\" ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/json")
	req.Header.Add("cache-control", "no-cache")
	req.Header.Add("postman-token", "dc1a0d33-3c89-5df5-9583-c2a622c4144d")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```
