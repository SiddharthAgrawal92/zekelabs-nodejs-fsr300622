const Players = require('../models/players.models');

const getPlayers = async (req, res) => {
    try {
        const totalRecords = await Players.countDocuments();
        Players.find({}).skip(req.query.skip).limit(req.query.limit).exec((err, playerList) => {
            if (err) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            res.status(200).send({ playerList: playerList, totalRecords: totalRecords });
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const createPlayer = async (req, res) => {
    const player = new Players(req.body);
    player.save((err, player) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        res.status(201).send(player);
    })

}

module.exports = {
    getPlayers,
    createPlayer
}