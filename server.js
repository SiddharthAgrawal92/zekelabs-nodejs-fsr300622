const express = require('express');
// const bodyParser = require('body-parser');
const fs = require('fs');
// const path = require('path');
const app = express(); //express-app
const PORT = 8080;

// //custom/3rd party middleware will get executed first here
// app.use(bodyParser.json()); //parse the json type of body

// //custom middleware as a logger
// app.use('/', (req, res, next) => {
//     fs.appendFile(path.join(__dirname, './logs/apiLog.log'), JSON.stringify({
//         method: req.method,
//         url: req.url,
//         body: req.body,
//         headers: req.headers,
//         date: new Date()
//     }) + '\n', (err) => {
//         if (err) throw err;
//     });
//     next();
// })

// //----------server endpoints----------//
app.get('/', (req, res) => {
    console.log(req.method, req.url);
    res.status(200).send({ msg: "Hi from Server!" });
});

// //create item
// app.post('/items', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.status(401).send({ msg: "Token is required" });
//     }
// }, (req, res) => {
//     console.log(req.method, req.url, req.body);
//     let isDbInsertionSuccess = false;

//     //db operation to store the data
//     setTimeout(() => {
//         isDbInsertionSuccess = true;
//         //sending the response back to client when data is inserted successfully in the db
//         if (isDbInsertionSuccess) {
//             res.status(200).send({ msg: "Item has been inserted successfully" });
//         } else {
//             res.status(500).send({ msg: "Internal Server Error" });
//         }
//     }, 1000);
//     // res.send(201);
// });

// //get the items
// app.get('/items', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.status(401).send({ msg: "Token is required" });
//     }
// }, (req, res) => {

// });


// //get --> get the data
// //post --> create a data
// //put --> update
// //delete --> delete

// //axios.post('http://localhost:8080/items', payload);

app.listen(PORT, () => {
    console.log(`Server is listening at: http://127.0.0.1:${PORT}`);
});
//127.0.0.1 - localhost

//react-js code
//axios.get('https://dev.your-org.com')
//192.168.1.108:8080(ip address) --> https://dev.your-org.com

// 192.168.1.108 - 192.168.1.999 --> 1000 machines they are connected internally with each other
//IT team install the firewall in the organization to safeguard the internal machines 


//Some requests
//NodeCore
//---params---//
// GET - http://localhost:8080/items/100/all - param
//without framework in node core this needs to be done manually with srt.split('/')
// endpoint = http://localhost:8080/items/
// param1 = 100
// param2= all

//---query-params---//
// inbuilt url module by using url.parse(req.url)

//framework - express
// params = req.params
// queryParam = req.query = {name: 'sid', type: 'all', version :1}