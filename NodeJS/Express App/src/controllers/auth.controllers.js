const Users = require('../models/users.models');

const login = (req, res) => {
    Users.findOne({ userName: req.body.userName }).exec((err, foundUser) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else if (!(foundUser && foundUser.validatePassword(req.body.password))) {
            res.status(401).send({ error: 'userName or password is incorrect' });
        } else {
            res.status(200).send({ msg: 'Login Successful' });
        }
    })
}

module.exports = login;