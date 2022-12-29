//M(MongoDB)(---Express---)A(Angular)N(NodeJS) Stack
//M(MongoDB)(---Express---)R(ReactJS)N(NodeJS) Stack


## middleware - intercept the client request - to implement this we've to use 'use()'
//uses of it - 
//1.
// authentication - when we login we get the JWT token from login API that tell which 
//all API endpoints we are authorized to call

//role - admin - JWT --> authorized to  access to all API endpoints
//role - user - JWT -->  authorized to  access to users API endpoints

//2.
// logging in http requests

//authorization the request

## middleware for body parsing
// app.use(body-parser)
// app.use(body-parser)
// app.use(cors)

## Express-Router
//MVC - For each module/feature of the app(e.g. CRUD on Users, Items, Players...);

//CRUD
// --> List Users - /users(GET)
// --> Create Users - /users(POST)
// --> Update Users - /users(PUT)

## CORS
origin(server) --> www.example.com (by default there is cors config present in the server)
1. when call is made from the browser browser will fire a options(pre flight request) call to the server
2. From this pre flight request browser used to check if origin config is present or not or by passed or not
3. If no cors config is not present then browser refrain sending the actual request to the server


## Web Sockets
1. We need to create a web socket in the server
2. The instance of web socket will be available on a particular address to listen to the client
3. From client side we will make a request to the web socket address. This is what is called a handshake    request
4. Each client will be handled uniquely with the help of socket_id which fulfills by the web socket eventually making a handshake request fulfilled. This forms a pipe/channel for 2 way communication using events asynchronously 
5. From client if we can close the connection which web socket wil close for a particular socket_id
6. if server is down then web socket connection in the client side will be retried to get connected

## uses in multiple ways
1. You are showing some records in the frontend say total 50 records you have in db(collection) which is shared across other clients who are also allowed to do the CRUD operation.
2. What happens out of these 1 got updated and 1 got deleted bu some other user.
3. If I have 50 records available in my view and I don't refresh it I will see the wrong data.
4. So one workaround can be to keep refreshing the data by polling the data. (this increases the network cost)
5. Another good approach is to have the data synchronize using web socket. We can emit an event informing the client whenever any single update/delete trivial operation is done which saves us from  a huge polling to get the whole records set updated in the frontend view.

## How to show large amount of records(say 100s of 100s or millions) in frontend
1. It will take time and also hand the app if we ask server to give 1million record in a single call.
2. Solution would -
    a. Pagination
    b. Infinite scroll
    c. Web socket

## Miscellaneous
1. custom CORS config
2. winston logger
3. Security Headers
4. Compression
5. Streams and how to live stream a video
6. Event and callbacks
7. How to prevent a DDOS attack on to the server(10,000) --> 10 request can be served at a time
