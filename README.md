---
runme:
  id: 01HG17SVS0HP1E7WCW84FXHZPH
  version: v2.0
---

# DAZN_rekru

Recruitment program for DAZN. Task was to create an API that will know how many streams does user have currently opened, and will not allow him to have more than 3 concurently opened.

## Requirements

This program was developed using Node.js (version 20.9.0) which is available do download from [official website](https://nodejs.org/en/download/current). In addition, git should be installed to easily clone the repository.

## Setup

To setup the program, first clone the repository, then install the necessary packages as bellow.

```sh
git clone https://github.com/MrResor/DAZN_rekru.git
cd DAZN_rekru
npm install
```

After the installation the API is ready to be used by running the following command.

```sh
node .\src\index.js
```

## Usage

Program exposes two endpoints, \api\stream\open and \api\stream\close. They are described in details below.

#### \api\stream\open

Endpoint that should be contacted when user opens a stream. It requires body (in JSON format) containing field "user" with his id. If that is provided, and user has less than 3 opened streams at the same time, response with 200 status code and body containing "Over_Limit" field and false value will be send. If user has 3 streams opened, any further requests will send value of true in the "Over_Limit" field in body. In case that there is no body at all, or field "user" is not present, endpoint will send 400 status code, and will log the faulty request.

#### \api\stream\close

Endpoint that should be contacted when user closes a tab or stream ends. It requires body (in JSON format) containing field "user" with his id. If that is provided and user is curently tracked by program (he should be, it should not be possible to close stream without opening it fiest), response with 200 status code will be send. If user for some reason this user was not tracked status code 204 will be send and the request will be logged. In case that there is no body at all, or field "user" is not present, endpoint will send 400 status code, and will log the faulty request.

## Testing

For testing purposes a postman workspace has been created (available [here](https://www.postman.com/aviation-geoscientist-80524938/workspace/dazn-rekru)). Simple unit tests for both endpoints, as well as stress testing while using both of them at the same time can be performed there.
