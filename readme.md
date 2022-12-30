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

## GIT
// dev --> (10+5new features) all under development features will go in dev branch
// testing --> (10+1new feature) for testing by QA
// production --> 10+1 new features are now live

## Software development process in (agile framework)
1. Requirement is gathered by the business team
2. As per the customer/product owner they(business/product owners/managers) need to set the priority of features(Users Feature(CRUD), Items, Dashboard(big feature that can be further broken down into multiple sub tasks/features))
3. There will be agile team(s) (of 5-7 members in each team) will be involved in tasks/features discussion with the product team for the feasibility/modification.
4. The above gathered requirement will be logged in the project management tool like Jira/Azure Devops etc.
and then assigned to the team members.
5. Now feature/task owner from team will provide the estimate(tentative) for completion of task.

//sprint - period of days/weeks assigned for doing to development and testing.

## How to explain the project to the interviewer 
1. Explain about the Domain/feature of the product you've worked on.
2. You will mention about your roles and responsibilities in the project.
3. Then you explain about different techs/layers/architecture of the product.

// javascript Promises, async-await, callbacks, Array & Objects prototypical methods
// NodeJS async fs, express, event loop, is it only single threaded?
// Ans --> By default it is not Single threaded. we can take the use of multi threading with the help of "child_process" module but we should not do CPU intensive task much otherwise CPU will be consumed a lot and finally we will run out of CPU because that's not the way Nodejs was designed.
// e.g. lets suppose there is a need of blocking code/CPU intensive task if we perform that instead of executing it in main thread using event loop we will spawn a new process to do that because we don't want to block the other connected clients for completion of that task for a particular client.
//streams --> 1 GB of data cannot be read in one call
//create a write stream --> we split the data in multiple chunks and the send through it
//create read stream --> will read the chunks send by the write stream

//e.g.,
let result = '';
req.on('data', chunk: Buffer=>{
    result += chunk;
});
req.on('end', ()=>{
    console.log('result: ', result);
})

// String, list input:[{}] & desired output:[{}] 

## Miscellaneous
1. winston logger
2. Security Headers
3. Compression
4. Streams and how to live stream a video
5. Event and callbacks
6. How to prevent a DDOS attack on to the server(10,000) --> 10 request can be served at a time