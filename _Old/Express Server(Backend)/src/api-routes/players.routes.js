const playersRoutes = require('express').Router();
const { getAllPlayers, getPaginatedPlayersWithParam, getPlayersById } = require('../controllers/players.controllers');

//get all players without any param/query
playersRoutes.get('/', getAllPlayers) //GET - http://localhost:8080/players

//get all players without any param - req.params
playersRoutes.get('/:playerId', getPlayersById) //GET - http://localhost:8080/players/10/20

//get all players without any query - req.params
playersRoutes.get('/:limit/:skip', getPaginatedPlayersWithParam) //GET - http://localhost:8080/players/10/20


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

module.exports = playersRoutes;