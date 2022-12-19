//Micro-tasks (Microtasks has higher priority than macro-tasks)
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));

//Macro-tasks
setTimeout(() => {
    console.log('Timeout 1');
});
setTimeout(() => {
    console.log('Timeout 2');
    Promise.resolve().then(() => console.log('Promise 3'));
});

setTimeout(() => {
    console.log('Timeout 3');
});

process.nextTick(() => {
    console.log('Next Tick');
});
const fs = require('fs');
setImmediate(() => {
    // console.log('Immediate 1');

});
fs.readFile('./some_file.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

queueMicrotask(() => {
    Promise.resolve().then(() => console.log('Promise 4'));
    Promise.resolve().then(() => console.log('Promise 5'));
    Promise.resolve().then(() => console.log('Promise 6'));
})

// nvm (Node Version Manager) - this can be used to use multiple version of Nodejs in your machine

// Phases
// Before every loop nextTick() will be called
// Micro tasks
// 1. Timers
// 2. I/O
// 3. SetImmediate
// 4. Close

//loop 1
// Next Tick
// Promise 1
// Promise 2
// Promise 4
// Promise 5
// Promise 6

//** Phase-1 Timer */
// Timeout 1
// Timeout 2
// Promise 3
// Timeout 3

//** Phase-2 I/O */
// anything found will be assigned to internal thread pool - because this will take time for thread to be completed
// that's why this is not getting called immediately

//** Phase-3 setImmediate */
// Immediate 1

// ________________________________________

//loop 2
//** Phase-1 Timer */
// null

//** Phase-2 I/O */
// finds one and execute it

//** Phase-3 setImmediate */
// null

// process.exit()


// _______________________________________________________________________________
//difference in time between two operations precisely upto nanoseconds

// 1sec = 10**9 ns
// 1sec = 1000 ms --> 1ms = 1000microSeconds --> 1microseconds = 1000ns
let start = process.hrtime();
setTimeout(() => {
    const end = process.hrtime(start);
    console.log(`${end[0]}s ${(end[1]/Math.pow(10, 6))}ms`);
}, 2000);
