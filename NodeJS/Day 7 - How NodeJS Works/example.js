// console.log('Start of Event Loop');
// const startTime = Date.now() / 1000;
// //non-blocking code
// setTimeout(() => {
//     const endTime = Date.now() / 1000;
//     console.log(`This should get printed after 2sec: ${endTime - startTime}`);
// }, 2000);
// console.log('End of Event Loop');
//after all operations are completed event loop will exit itself


//Note - NodeJS uses single process --> but we can also use multiple by cloning os processes


//But in case of server it doesn't exit but rather it sleeps if no request is made from the client
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.end('Hello From Server!');
// });
// server.listen(8080, () => {
//     console.log('Server is running on : http://localhost:8080');
// });

//event loop in case of server
// while (true) {
//     if (request_is_there) {
//         //do something
//     } else {
//         //sleep
//     }
// }

//blocking code
console.log('Start of Event Loop');
const startTime = Date.now() / 1000;
//event-loop is stuck here tio perform some blocking task
while (true) {
    const endTime = Date.now() / 1000;
    if ((endTime - startTime) > 3) {
        console.log(`This should get printed after 3sec: ${endTime - startTime}`);
        break;
    }
}
//this simple will get delayed becasuse event-loop is not free to execute it
console.log('End of Event Loop');

// avoid blocking the main thread where event loop works by following below methods - 
// 1. avoid writing multiple nested loops   
// 2. avoid writing sync methods/code
// 3. avoid regex use that takes time to find anything from the string/data   
// 4. avoid complex tasks/cpu intensive task