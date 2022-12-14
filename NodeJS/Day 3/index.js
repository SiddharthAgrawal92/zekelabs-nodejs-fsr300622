const fs = require('fs'), 
path = require('path'), 
os = require('os'), 
http = require('http'); //core modules
const emoji = require('node-emoji'); //3rd party modules
const { getCurrentDate, getLocaleString } = require('./currentDate'); //local modules

// console.log('Current Date: ', getCurrentDate());
// console.log('Current Locale Date: ', getLocaleString());

// console.log('Current Path: ', path.join(__dirname, 'temp'));

// console.log(emoji.emojify('I :heart: :coffee:!'));

//Modules
// 1. Core Modules (part of NodeJS need not to be installed separately using npm) [*We don't have control on it]
// 2. 3rd party Modules (need to be installed separately using npm) [*We don't have control on it ]
// Note - but it can be possible if you customize and use the code in your project locally as open-source code
// 3. Local Modules (which we define in the project) [We have full control on these]


//File System - I/O operations
console.log('operation 1'); //synchronous in nature

//Read Operations
//synchronous in nature
// console.log('./temp/test.txt =>', fs.readFileSync('./temp/test.txt', 'utf-8')); //synchronous in nature
//writing blocking code like this can block your event-loop from performing other tasks in waiting
//asynchronous in nature
// setTimeout(() => {
// fs.readFile('./blog.txt', 'utf-8', (err, data) => { //asynchronous in nature 
//     //event-loop will assign it to a thread in the pool to readFile
//     // when done it will assign a callback to event queue
//     if (err) throw err;
//     console.log('./blog.txt =>', data);
// });
// });

//Write Operations will overwrite if file already contain data that will get overwritten by it
// fs.writeFileSync('./blog.txt', 'Written synchronously');
// fs.writeFile('./blog.txt', 'Written asynchronously', () => {
//     console.log('File ./blog.txt has been written successfully');
// });

//Appendfile --> append at the end of the file
// fs.appendFileSync('./blog.txt', '\nAppended synchronously');
// fs.appendFile('./blog.txt', '\nAppended synchronously', () => {
//     console.log('File ./blog.txt has been appended successfully');
// });

//UnlinkFile(Delete File)
// fs.unlinkSync('./blog.txt');
// fs.unlink('./blog.txt', (err) => {
//     if (err) throw err;
//     console.log('path/file.txt was deleted');
// });

console.log('operation 2'); //synchronous in nature

// event-loop will first clear all operations from call-stack & then go to the event queue to see if
// anything is waiting out there

// after your file delete synchronously (it's yet not done or is taking sometime)
//
// event loop multiple phases
// 1. Timers
// 2. pending callbacks
// 3. poll(I/O operations)
// 4. close the connections

//(it might be a connection processing of the delete file is still going on to the system)

// unicode is a world wide defined in the repo of unicode for different symbols and characters
// hindi, malayalam, english all languages which are known to the system
//\n --> u000A
//shift+enter soft enter --> u0028

// ascii - a-zA-Z 0-9,!@#$%^&*() 