
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const routes = require('./api-routes');
const fs = require('fs');
const path = require('path');
const serveIndex = require('serve-index');
const mongoose = require('mongoose');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

//serving files statically
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/public', serveIndex(path.join(__dirname, '../public')));

//db connection
//mongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection error!'));
db.on('open', () => {
    console.log('MongoDB is connected successfully');
});

//mysql
// const mySqlConnection = mysql.createConnection({
//     host: 'localhost',
//     post: 3306,
//     database: 'test',
//     user: 'sid1605',
//     password: '12345'
// });
// mySqlConnection.connect((err) => {
//     if (err) {
//         console.log('Mysql failed to get connected');
//     } else {
//         console.log('Mysql connected successfully');
//     }
// });

//middleware
//parses the body of each request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//resolving cors
app.use(cors());

//template engine settings
app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'pug');
app.set('view engine', 'jade');


app.use('/', (req, res, next) => {
    let log = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        timestamp: Date.now()
    }
    //this logs the above request to a log file as shown below
    // fs.appendFile(path.join(__dirname, '../logs/logs.log'), `${JSON.stringify(log)}\n`, 'utf-8', (err) => {
    //     if (err) throw err;
    // });
    next();
});

//api-routes handler
app.use('/', routes);

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server is running at: http://${process.env.HOSTNAME}:${process.env.PORT}`);
});