const Users = require('../models/users.models');

const getUsers = (req, res) => {
    Users.find({}).exec((err, userList) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        res.status(200).send({ userList: userList }); //sends the response and ends the request
    })
    // res.json(null); //sends the response and ends the request but it also parses null & undefined
}

const registerUser = (req, res) => {
    Users.findOne({ userName: req.body.userName }).exec((err, existingUser) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            if (existingUser) {
                res.status(400).send({ error: 'This user already exist. Please login or use another username to register.' })
            } else {
                const user = new Users(req.body);
                user.password = user.generateHash(req.body.password);
                user.save((err, createdUser) => {
                    if (err) {
                        return res.status(500).send({ error: 'Internal Server Error' });
                    }
                    res.status(201).send({ result: 'User is registered successfully' });
                });
            }
        }
    })
}

const updateUser = (req, res) => {
    Users.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, updatedUser) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        res.status(200).send({ result: updatedUser });
    })
}

const deleteUser = (req, res) => {
    // Users.findByIdAndDelete(req.params.userId, () => { })
    Users.deleteOne({ _id: req.params.userId }, (err, deletedUser) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        if (deletedUser.deletedCount === 1) {
            res.status(200).send({ result: deletedUser });
        } else {
            res.status(400).send({ msg: 'user not found with the sent userId' });
        }
    });
}

const detectIfUserAlreadyExist = (req, res) => {
    Users.findOne({ userName: req.query.userName }).exec((err, existingUser) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            if (existingUser) {
                res.status(200).send();
            } else {
                res.status(404).send();
            }
        }
    })
}

module.exports = {
    getUsers,
    registerUser,
    updateUser,
    deleteUser,
    detectIfUserAlreadyExist
}