
//import axios from 'axios'

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}); //requestHandler

// There are 2 ways are there to create the http server in NodeJS
// 1. Without any framework(even without any 3rd party module/package) --> http is a module to create a http type of server
// 2. With Framework - Express also uses the http module to create a http server

// handling all http calls to the server --> GET, PUT, POST, DELETE

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//event-loop
while(true){
    //no task there 
}

//CPU multiple cores/threads/processes

// NO CPU computation task
//[NODEJS] single thread --> 9K out of 10K can be served by event loop they are easy to be executed

//[Traditional] Multi threads(1000) concurrently employed --> 1K clients will get connected at a time
// and rest 9K has to wait for existing one to be freed.

// thread-pool - [1K]

// clients_1
// .
// .
// .
// 10K

//dead lock situation(in traditional servers)
//process_1 --> resource_1 --> it is waiting for the process_2 to free the resource_2
//process_2 --> resource_2 --> it is waiting for the process_1 to free the resource_1

// avoid synchronous code in Nodejs


// fs.readFile()//async //because this is an I/O operation so it will be assigned to an internal thread pool
// to read it and sends a callback to the event-queue

// op1
// op2
// op3
// .
// .
// .
// .
// op100
// event loop will check if the call-stack is free then if it finds it will take the next 
// operation(cb) waiting in the event-queue to be execution

// 1GB in one shot will it be good send it sync
// 1000 parts and then send it async

// stateful server
// request_1 --> response_1 = 1-50 records (keep the state=50 records)
// request_2 --> response_2 = 51-100 records (keep the state=100 records)

//stateless
// request_1=1-50 --> response_1 = 1-50 records
// request_2=200-300 --> response_2 = 200-300 records

// libu library is there in nodejs that invokes then we start the nodejs 