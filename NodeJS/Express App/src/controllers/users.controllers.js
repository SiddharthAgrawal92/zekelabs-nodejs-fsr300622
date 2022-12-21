const Users = require('../models/users.models');

const getUsers = (req, res) => {
    Users.find({}).exec((err, userList) => {
        if (err) {
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
        res.status(200).send({ userList: userList }); //sends the response and ends the request
    })
    // res.json(null); //sends the response and ends the request but it also parses null & undefined
}

const createUser = (req, res) => {
    const user = new Users(req.body);
    user.save((err, createdUser) => {
        if (err) {
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
        res.status(201).send({ result: createdUser });
    })
}

const createBulkUsers = (req, res) => {
    res.send(itemList);
}

const updateUser = (req, res) => {
    Users.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, updatedUser) => {
        if (err) {
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
        res.status(200).send({ result: updatedUser });
    })
}

const deleteUser = (req, res) => {
    // Users.findByIdAndDelete(req.params.userId, () => { })
    Users.deleteOne({ _id: req.params.userId }, (err, deletedUser) => {
        if (err) {
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
        if (deleteUser.deletedCount === 1) {
            res.status(200).send({ result: deletedUser });
        } else {
            res.status(400).send({ msg: 'user nor found with the sent userId' });
        }
    });
}


module.exports = {
    getUsers,
    createUser,
    createBulkUsers,
    updateUser,
    deleteUser
}