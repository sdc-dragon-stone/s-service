# Mashbnb - More Homes

> Replicating Airbnb. This is the "More Homes" module.

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
npm run build (to run webpack and bundle files)
npm run start (to start the server using port 3000)
npm run seedDb (to seed the database)
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

### GET one home

Route: `GET /home/:id`
Content-type: application/json

Sample response object:
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

### POST one home

Route: `POST /home`
Content-type: application/json

Sample body:
```sh
{
  "picture" : "https://s3-us-west-1.amazonaws.com/mashbnb/63b5a1b7_original.jpg",
  "type" : "entire voluptatem",
  "city" : "Wardbury",
  "description" : "PCI calculating Route",
  "price" : 141,
}
```

Note:
* All keys in object are required
* No extra keys may be added
* `price` must be an integer
* `picture` must be an image uploaded to a URL

### PUT one home

Route: `PUT /home/:id`
Content-type: application/json

Sample body:
```sh
{
  "type" : "2 bedroom masterpiece",
}
```

Note:
* Calls will only override the specified keys

### DELETE one home

Route: `DELETE /home/:id`
Content-type: application/json

Returns 204 on success
