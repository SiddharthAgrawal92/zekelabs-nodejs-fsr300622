const emoji = require('node-emoji');

console.log(emoji.emojify('I :heart: :coffee:!'));

let myName = "Siddharth Agrawal".split(" ");
console.log('First Name: ', myName[0]);
console.log('Last Name: ', myName[1]);

//"nodemon" is npm package--> this will detect any new changes in the js file and re-run the code inside node environment

// item -> (package.json)  front part of wrapper we see the brand, name and quantity
// item -> (package-lock.json) back side of wrapper we see the indigriends of the chocolate