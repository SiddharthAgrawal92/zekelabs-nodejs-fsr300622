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

##CORS
origin(server) --> www.example.com (by default there is cors config present in the server)
1. when call is made from the browser browser will fire a options(pre flight request) call to the server
2. From this pre flight request browser used to check if origin config is present or not or by passed or not
3. If no cors config is not present then browser refrain sending the actual request to the server


##Miscellaneous
1. custom CORS config
2. winston logger
3. Security Headers
4. Compression
5. Streams and how to live stream a video
6. Event and callbacks
7. How to prevent a DDOS attack on to the server(10,000) --> 10 request can be served at a time