# todos-node-api
This is a todo list API built using NodeJS, Express, MongoDB, Mongoose and JWT.
By using this API registered users can perform CRUD operations on their todo-list. User authentication is done using JWT.
The API is deployed on Heroku. This API uses the MLab hosted on AWS EC2 instance as its API.

Please find below different routes which can be used to consume data from the API.

GET /todos - this route fetches the todos stored in the database
https://todos-nodejs-api.herokuapp.com/todos

POST /todos - this route lets you post todos i.e., add new todos to the database
https://todos-nodejs-api.herokuapp.com/todos

GET /todos/:id - this route lets you fetch a specific todo by its id. Provide a valid id fetched by GET /todos path in place of ':id'
https://todos-nodejs-api.herokuapp.com/todos/:id

PATCH /todos/:id - this route finds an existing todo by its id lets you update it, like setting the todo to completed & completedAt.
https://todos-nodejs-api.herokuapp.com/todos/:id

DEL /todos/:id - this route lets you delete a todo by its id
https://todos-nodejs-api.herokuapp.com/todos/:id

POST /users - this route lets you create a new user. 
The user email and password are validated and authenticated using 'validator' available in npm
https://todos-nodejs-api.herokuapp.com/users

GET /users/me - this route is setup for generating JWT and verifying the token for authenticating user access to the route
https://todos-nodejs-api.herokuapp.com/users/me

Currently updating the user authentication and that is yet to be deployed on heroku. 
All the changes made to this API are validated using Postman.
