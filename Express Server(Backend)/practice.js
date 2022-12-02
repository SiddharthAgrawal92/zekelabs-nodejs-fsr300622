//event-loop

//10,000 requests come at the same time for a particular request
//event queue --> event loop --> // will check weather this needs to be assigned to cpu for processing
// OR Timers - it is a async call that needs to be sent after sometime(setTimeout, Filesystem async call or any async call Promise async-await) assign it a thread with a callback
// Blocking - synchronous calls
// Non Blocking - code that can be executed immediately

//pool -->  timer - [op1, op2]

//Case-1- non-blocking
// const initiatedTime = Date.now();
// setTimeout(() => {
//     console.log('op1', Date.now() - initiatedTime);
// });
// setTimeout(() => {
//     console.log('op2', Date.now() - initiatedTime);
// });
// console.log('Event loop starts here', Date.now() - initiatedTime);

// const startingSeconds = new Date().getTime() / 1000;

//Case-1- non-blocking
// //blocking loop
// while (true) {
//     if ((new Date().getTime() / 1000 - startingSeconds) > 2) {
//         console.log('Logged after 2 seconds');
//         break;
//     }
// }
// console.log('Expected to be executed immediately');

//avoid infinite use of regex checking for any string--> any file name

//-----------Modules-----------//

//modules --> local modules / core modules / 3rd party modules
// const path = require('path');
// const fs = require('fs');

//-----------Path & File System-----------//
// const myPath = './static/test.txt';
// console.log(myPath);
// console.log('File Parent Folder: ', path.dirname(myPath));
// console.log('File Name: ', path.basename(myPath));
// console.log('File Name: ', path.basename(myPath, path.extname(myPath)));
// console.log('File Extension Name: ', path.extname(myPath));

// const filePath = path.join(path.dirname(myPath), 'temp', 'tempFile.txt');

// fs.writeFile(path.join(path.dirname(myPath), 'temp', 'tempFile.txt'), 'Hello Universe', (err) => {
//     if (err) throw err;
// });
// fs.unlink(filePath, (err) => {
//     if (err) throw err;
//     console.log(`Filename ${path.basename(filePath)} has been deleted successfully.`);
// });

// //path resolve
// console.log('Absolute Path: ', path.join(__dirname, myPath));
// console.log('Absolute Path: ', path.resolve(myPath));

// console.log('Another Folder: ', path.resolve('new folder', myPath));

//----------------events---------------//

const { Socket } = require('dgram');
const events = require('events');
const evtEmitter = new events.EventEmitter();

// event to get the value
//with params
// evtEmitter.on('myEvent', (param1, param2, param3) => {
//     console.log(param1, param2, param3);
// });

//with args
evtEmitter.on('myEvent', (...args) => {
    console.log(args);
});

evtEmitter.emit('myEvent', 1000, 'Sid', { key1: 'value1', arr: [1, 2, 3, 4, 5] }, 19.12);

//with only few lOC 10-15 we can create a live chat room with the help of events and sockets
// Socket.on('connection');

//streams  
// --> browser or any client postman they will createWriteStream(body)
// --> server will create a readStream to get the data using events

//10 chunks --> will be passed 1-by-1 using the stream on event name "data"
//req.on('data') -->  payload parsing in node core
//req.on('end') --> 
