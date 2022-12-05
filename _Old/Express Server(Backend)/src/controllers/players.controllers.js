
const getAllPlayers = (req, res) => {
    // 1. connecting to sql db --> secured banking transaction
    // 2. connecting to Mongodb db --> for all others
    // 3. elastic cache --> JWT

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
    res.status(200).send({ playerList: [{ count: 10000 }], queryParams: req.query });
}


const getPlayersById = (req, res) => {
    //db give me the player with id = req.params.playerId
    res.status(200).send({ playerList: [{ id: req.params.playerId, name: 'Sachin Tendulkar', sport: 'Cricket' }] });
}

//1-10,000 --> 1st page 1-100 | 2nd page 101-200 | last page 9901- 10000
const getPaginatedPlayersWithParam = (req, res) => {
    res.status(200).send({ playerList: [req.params] });
}

const createPlayer = (req, res) => { }

const updatePlayer = (req, res) => { }

const deletePlayer = (req, res) => { }

module.exports = {
    getAllPlayers,
    getPlayersById,
    getPaginatedPlayersWithParam,
    createPlayer,
    updatePlayer,
    deletePlayer
}