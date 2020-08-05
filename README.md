### [Russian](./README_ru.md)  👈

# JSON API for an ad site

This is a service for creating and storing ads. The service provides APIs working in JSON format.

## Technology Stack
* MongoDB
* Express
* Node.js

## Try it yourself
```
$ npm install 
```

In the config.json file, specify the MongoDB port and token.

To start the server:

```
$ node app.js 
```
or
```
$ npm run start
```

## API Methods

### Create an ad:

Main page - `/`

* Accepts fields: name, description, several links to photos, price.
* Returns the ID of the created ad and the result code (error or success)

### Get list of ads: 

Get all ads - `/api/ads`

Sort by price - `/api/ads?price=desc` or `/api/ads?price=asc`

Sort by creation date - `/api/ads?date=desc` or `/api/ads?date=asc`

### Get ad by id:

Ad name, price, link to the main photo - `/api/:id`

Optional fields (can be requested by passing the 'fields' parameter): description, links to all photos - `/api/fields/:id`

## [Link to the task](https://github.com/avito-tech/verticals/blob/master/trainee/backend.md#%D1%82%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
