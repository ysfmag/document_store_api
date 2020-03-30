## Description

In this project, we are using [Nest](https://github.com/nestjs/nest) framework .

## Installation

```bash
$ npm install
```

## Running the app us

```bash

# simple way using docker-compose
$  make up
```

or

```bash
# the hardway :D
# launch database with docker
$ npm run start:db

# launch serveur
$ npm run start:dev
```

## Api documentation

go to swagger => http://localhost:5000

## Helper

take a look into database

Go to http://localhost:8080 and copy past the adminer.js file in the browser console

## Test

```bash
# unit tests
$ npm run test

```

## Exampls

```js

POST  http://localhost:5000/document
content-type: application/json

{
  "document":{
    "name":"68c0d0ssss8",
    "type":"3",
    "quantity":20
  }
}

###


GET  http://localhost:5000/document/284fe61f-b359-4e68-b31d-c7313935ef7c
content-type: application/json


###


PUT  http://localhost:5000/document/284fe61f-b359-4e68-b31d-c7313935ef7c
content-type: application/json

{
    "document":{
        "type":"000",
        "quantity":200003,
        "obj":1001
    }
}



###


GET  http://localhost:5000/document/284fe61f-b359-4e68-b31d-c7313935ef7c/history
content-type: application/json

###

POST   http://localhost:5000/document/284fe61f-b359-4e68-b31d-c7313935ef7c/diff
content-type: application/json

{
    "version_1":1,
    "version_2":2
}

```
