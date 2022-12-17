/**
 * NodeJs Core Module "os"
 */

// const os = require('os');
// console.log('Hostname: ', os.hostname());
// let freeMemory = (os.freemem() / (1024 * 1024 * 1024));
// console.log('Free Memory(RAM): ', `${freeMemory.toFixed(2)} Gbs`); //return in bytes
// let totalMemory = (os.totalmem() / (1024 * 1024 * 1024));
// console.log('Total Memory(RAM): ', `${totalMemory.toFixed(2)} Gbs`); //return in bytes
// console.log('OS architecture: ', os.arch());
// console.log('OS CPUs: ', os.cpus());
// console.log('Home Directory: ', os.homedir());
// console.log('Absolute Path: ', __dirname);
// console.log('Uptime: ', os.uptime());
// console.log('Temporary Folder: ', os.tmpdir());
// console.log('OS Platform: ', os.platform());
// console.log('Network Interfaces: ', os.networkInterfaces());
// console.log('Machine Type: ', os.machine());
// console.log('Machine Load Average: ', os.loadavg());

/**
 * NodeJs Core Module "path"
 */

const path = require('path');
const filPath = './temp/simple.txt';
console.log('Directory Name: ', path.dirname(filPath));
console.log('File Name(With Extension): ', path.basename(filPath));
console.log('File Extension Name: ', path.extname(filPath));
console.log('File Name(With Extension): ', path.basename(filPath, path.extname(filPath)));
console.log('Absolute Path for Root Directory: ', __dirname)
console.log(path.join(__dirname, filPath));
console.log(path.join('/', 'temp2', 'garbage', 'temp.log'));
console.log('Absolute path: ', path.resolve(filPath));
console.log('With New Folder: ', path.resolve('newFolder', 'another-folder', filPath));

//simple tasks using "fs" & "path" modules
// const fs = require('fs');
//1. copy operation
//2. cut operation
//3. make a directory - fs.mkdir()
//4. delete a directory - fs.rmdir()
