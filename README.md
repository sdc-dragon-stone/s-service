# Mashbnb

> Replicating Airbnb

## Related Projects

  - https://github.com/mash-fec/a-service
  - https://github.com/mash-fec/j-service
  - https://github.com/mash-fec/m-service
  - https://github.com/mash-fec/v-service

## Table of Contents

1. [Requirements](#requirements)
2. [Development](#development)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MongoDB

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm start (to start the server)
npm seedDb (to seed the database)
```

## API Requests
### Description: GET request to '/morehomes'
Sample JSON output: array of objects

Sample object:
```sh
{
  "_id" : 90,
  "picture" : "https://s3-us-west-1.amazonaws.com/mashbnb/63b5a1b7_original.jpg",
  "type" : "entire voluptatem",
  "city" : "Wardbury",
  "description" : "PCI calculating Route",
  "price" : 141,
  "rating" : "Stars: 4",
  "reviews" : 49,
  "__v" : 0
}
```