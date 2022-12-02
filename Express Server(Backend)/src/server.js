//3rd party modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //express-app
const cors = require('cors');

//core-module (part of nodejs)
const fs = require('fs');
const path = require('path');

//local-modules
const { Format, getCurrentDate } = require('./local-modules/currentDate');
const appConfig = require('./config/appConfig');
const baseRoutes = require('./api-routes');


//middleware
app.use(cors());
app.use(bodyParser.json()); //parse the json type of body
app.use('/', (req, res, next) => {
    fs.appendFile(path.join(__dirname, '../logs/apiLog.log'), JSON.stringify({
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
        date: new Date()
    }) + '\n', (err) => {
        if (err) throw err;
    });
    next();
});

//api routes/endpoints
app.use('/', baseRoutes);

app.listen(appConfig.PORT, appConfig.hostname, () => {
    console.log(`Server is listening at: http://${appConfig.hostname}:${appConfig.PORT}`);
});
