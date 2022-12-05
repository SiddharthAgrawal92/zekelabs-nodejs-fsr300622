const baseRoutes = require('express').Router();
const playersRoutes = require('./players.routes');

baseRoutes.get('/', (req, res) => { //http://localhost:8080
    res.status(200).send({ msg: "Hi from Server!" });
});

// //----------API endpoints----------//
//http://localhost:8080/players - GET, POST, DELETE, PUT, PATCH
/**
 * Players Route
 */
baseRoutes.use('/players', playersRoutes);

/**
 * Items Route
 */
// baseRoutes.use('/items', itemsRoutes);


module.exports = baseRoutes;

//-----Miscellaneous---------//
//template engine to send the dynamic html from node server --> pug, jade

//UI Module --> Players --> Create, List, Delete, Update
// M - Model (Database Model)
// V - View (Response to the Customer)
// C - Controller (Business Logic, how we are doing and what we are doing)

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

// //get --> get the data
// //post --> create a data
// //put --> update
// //delete --> delete

// //axios.post('http://localhost:8080/items', payload);

//---query-params---//
// inbuilt url module by using url.parse(req.url)

//framework - express
// params = req.params
// queryParam = req.query = {name: 'sid', type: 'all', version :1}