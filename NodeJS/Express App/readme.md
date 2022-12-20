//M(MongoDB)(---Express---)A(Angular)N(NodeJS) Stack
//M(MongoDB)(---Express---)R(ReactJS)N(NodeJS) Stack


//middleware - intercept the client request - to implement this we've to use 'use()'
//uses of it - 
//1.
// authentication - when we login we get the JWT token from login API that tell which 
//all API endpoints we are authorized to call

//role - admin - JWT --> authorized to  access to all API endpoints
//role - user - JWT -->  authorized to  access to users API endpoints

//2.
// logging in http requests

//authorization the request

//middleware for body parsing
// app.use(body-parser)
// app.use(body-parser)
// app.use(cors)

// Express-Router
//MVC - For each module/feature of the app(e.g. CRUD on Users, Items, Players...);

//CRUD
// --> List Users - /users(GET)
// --> Create Users - /users(POST)
// --> Update Users - /users(PUT)