# Auth API
Generic backend RESTful authentication API. Deployed at [auth-api.bradware.com](//auth-api.bradware.com)

## Technologies
* [Node.js](//nodejs.org/en)
* [Express](//expressjs.com)
* [Heroku](//devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

## Getting Started
* download [Node.js](//nodejs.org/en/download/) or `brew install node`
* `git clone https://github.com/bradware/auth-api.git`
* `cd auth-api`
* `npm install`
* `npm start`
* visit `localhost:3000` in your browser or [Postman](//www.getpostman.com)

## Endpoints

### Register Endpoint
#### POST - [auth-api.bradware.com/register](//auth-api.bradware.com/register)
#### Sample Request
```json
{
  "first_name": "Sample",
  "last_name": "User",
  "date_of_birth": "11/06/1998",
  "email": "sample.user@gmail.com",
  "password": "123",
  "phone_number": "123-456-7890",
  "address": {
    "street": "123 Fake St.",
    "city": "Fakeville",
    "state": "CA",
    "postal_code": "12345"
  }
}
```
#### Sample Response
```json
{
  "header": {
    "token": "eyJhbGciOiJIUzpXVCJ9.eyJkYXRhIjoicLnjE0ODc3MjcyOTR9.KGn343mRKW1WZC8_pwHYRbYNNM"
  },
  "body": {
    "user": {
      "_id": "58acdc06df34ca0004ca0e8a",
      "first_name": "Sample",
      "last_name": "User",
      "date_of_birth": "11/06/1998",
      "email": "sample.user@gmail.com",
      "password": "$2a$10$2c926fKn4HnKqRr/p5rsfuQg3F9OEFwR3hkWIXyy2jwvYbUYDtYYu",
      "phone_number": "706-247-9651",
      "__v": 0,
      "children": [],
      "address": {
        "street": "123 Fake Lake",
        "city": "Fakeville",
        "state": "CA",
        "postal_code": "12345"
      },
      "created_at": "2017-02-22T00:32:06.407Z"
    }
  }
}
```

### Login Endpoint
#### POST - [auth-api.bradware.com/login](//auth-api.bradware.com/login)
#### Sample Request
```json
{
  "email": "sample.user@gmail.com",
  "password": "123"
}
```
#### Sample Response
```json
{
  "header": {
    "token": "eyJhbGciOiJIUzpXVCJ9.eyJkYXRhIjoicLnjE0ODc3MjcyOTR9.KGn343mRKW1WZC8_pwHYRbYNNM"
  },
  "body": {
    "user": {
      "_id": "58acdc06df34ca0004ca0e8a",
      "first_name": "Sample",
      "last_name": "User",
      "date_of_birth": "11/06/1998",
      "email": "sample.user@gmail.com",
      "password": "$2a$10$2c926fKn4HnKqRr/p5rsfuQg3F9OEFwR3hkWIXyy2jwvYbUYDtYYu",
      "phone_number": "706-247-9651",
      "__v": 0,
      "children": [],
      "address": {
        "street": "123 Fake Lake",
        "city": "Fakeville",
        "state": "CA",
        "postal_code": "12345"
      },
      "created_at": "2017-02-22T00:32:06.407Z"
    }
  }
}
```

### Logout Endpoint
#### GET - [auth-api.bradware.com/logout](//auth-api.bradware.com/logout)
Can either be a raw JSON or x-www-form-urlencoded body request
#### Sample Request
HEADERS

| KEY           | VALUE                                                     |
| ------------- | --------------------------------------------------------- |
| token         | `eyJhbGciO.4MDAsImlhdCI6MTQ4MjQ1MzgzMH0.JsY4S1zYO_tZHPA…` |

OR

`https://auth-api.bradware.com/random?token=eyJhbGciO.4MDAsImlhdCI6MTQ4MjQ1MzgzMH0.JsY4S1zYO_tZHPA…`
#### Sample Response
```json
{
  "success": {
    "message": "User logged out"
  }
}
```

### Random Endpoint
#### GET - [auth-api.bradware.com/random](//auth-api.bradware.com/random)
Can either be a raw JSON or x-www-form-urlencoded body request
#### Sample Request
HEADERS

| KEY           | VALUE                                                     |
| ------------- | --------------------------------------------------------- |
| token         | `eyJhbGciO.4MDAsImlhdCI6MTQ4MjQ1MzgzMH0.JsY4S1zYO_tZHPA…` |

OR

`https://auth-api.bradware.com/random?token=eyJhbGciO.4MDAsImlhdCI6MTQ4MjQ1MzgzMH0.JsY4S1zYO_tZHPA…`
#### Sample Response
```json
{
  "header": {
    "token": "eyJhbGciOiJIUpXVCJ9.eyJkYXRhIjoic2FtcGxlLniaWF0IjoxMjc3NTN9.IwRXn0zjrljL2-3AjFE9FjAooKaob9FE"
  },
  "body": {
    "string": "zYyKZB4aZ4"
  }
}
```
