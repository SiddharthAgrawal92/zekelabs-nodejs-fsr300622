
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const routes = require('./api-routes');
const fs = require('fs');
const path = require('path');

app.use('/', (req, res, next) => {
    let log = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        timestamp: Date.now()
    }
    fs.appendFile(path.join(__dirname, '../logs/logs.log'), `${JSON.stringify(log)}\n`, 'utf-8', (err) => {
        if (err) throw err;
    });
    next();
});

app.use('/', routes);

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server is running at: http://${process.env.HOSTNAME}:${process.env.PORT}`);
});