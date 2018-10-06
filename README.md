# Todo App Backend

This is the backend REST API for the todo app
<INSERT LINK TO FRONTEND>

## Install instructions:

unzip or git clone
run `npm install`

To start the server, using docker:
`docker-compose up`
This will run the server for the REST API and for the MongoDB database

## The REST API

main url: 'http://localhost:3000'

### Routes:
#### GET /todo-items
  returns an array of todo-items
  e.g. 

     [
       {
          "status": "pending",
          "_id": "5bb9003ece4c720028a1b19c",
          "title": "something",
          "createdAt": "2018-10-06T18:34:38.038Z",
          "updatedAt": "2018-10-06T18:34:38.038Z",
          "__v": 0
      },
      {
         "status": "done",
         "_id": "5bb90156d6af9d0046de4bfe",
         "title": "something else",
         "createdAt": "2018-10-06T18:39:18.512Z",
         "updatedAt": "2018-10-06T19:21:54.030Z",
         "__v": 0,
         "description": "this is a description",
         "completedAt": "2018-10-06T19:21:54.021Z"
      }
     ] 

#### POST /todo-items

  Creates a todo item

  req.body should include the following fields:

  title: String, required
  
  description: String,
  
  status: String, one of: "pending", "in process", "done", "archived", default: "pending"
  
  NOTE: fields createdAt and updatedAt are set by the database.
  
  field completedAt is set when an item is created with status equal to "done"
  
  Returns the created Todo Item


#### PATCH /todo-items/:id

  Updates a todo item with the corresponding id

  req.body can include the following fields:

  title: String,

  description: String,

  status: String, one of: "pending", "in process", "done", "archived"

  Should only include fields that need to be updated. Fields set to null will not be updated.

  NOTE: field updatedAt is set by the database

  field completedAt is set when an item is updated to a status of "done"

  Returns the updated Todo Item

## TODOS

Possible improvements

### Pagination, search, filter

The GET /todo-items currently returns all the items stored in the database. In the future, it should paginate the results and allow for search or filter options.
In the future, the list might only include a few fields from each todo item (e.g. title and status but not description).


### GET individual items

For the prototype, I do not excpect to need to request detailed information about a specific todo items. This might be necessary in the future depending on the data stored for each item and the use case in the front-end.
