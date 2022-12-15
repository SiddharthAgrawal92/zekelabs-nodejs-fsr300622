
// / npm install axios(http GET,PUT,POST)

// operations          NodeJS(infinite loop event-loop)
//                         _________________               taskHandler_1(1) taskHandlers_2(2)
//   12345                 _________________


console.log('foo1'); //synchronous call
setTimeout(() => { //asynchronous call
    console.log('bar');
}, 500);
console.log('foo2');//synchronous call


//                         _________________               taskHandler_1(you notify me with a callback when you are done with the operation) taskHandlers_2(2)
//   foo_2 bar foo_1       _________________

// ____________________
//frontend api request 1...1000   ___________________           taskHandler(1,...100)

// Multi CPU --> 10000Cores --> traditional server 1m

// NodeJS CPU --> 1000 --> NodeJS 500000(immediately executed) --> 100,000 db manipulation(internal thread pool-200) I/O operations
// sync--> blocking operation XXXX should not write in nodeJS
// 100,000 --> async 
// Disadvantage --> With Heavy computation task



//call-stack
// [foo_1, bar, foo_2]

//event loop a part of "libuv" library
// while (true) { //event-loop main thread is running
//     if (executionIsAsync) {
//         //assign it to "internal thread pool" and that request is assigned with a callback
//         //2. bar is a timer type of request --> is assigned to internal thread pool to handle
//     } else {
//         //1. execute console.log("foo_1");
//         //3. execute console.log("foo_2");
//     }
//     if (callStakIsEmpty && WeHaveAnythingInTheEventQueue) {//anything pending to be completed
//         //4. execute console.log('bar');
//     }
//     //sleeping....
// }

//worker threads
//cpu tasks, polling, db connectivity, file system(in computer/machine read/write/append file)
//1. [setTimeout for 'bar' will be sent back to callback queue after 500 ms]

//event-queue
// [callback is assigned by internal pool --> ()=>console.log('bar')]
