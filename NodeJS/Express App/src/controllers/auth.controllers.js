const Users = require('../models/users.models');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    Users.findOne({ userName: req.body.userName }).exec((err, foundUser) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else if (!(foundUser && foundUser.validatePassword(req.body.password))) {
            res.status(401).send({ error: 'userName or password is incorrect' });
        } else {
            const claims = {
                iss: 'http://www.abc.com',
                sub: foundUser.firstName,
                scope: foundUser.role
            }
            const access_token = jwt.sign(claims, process.env.JWT_ACCESS_TOKEN_KEY, {
                algorithm: 'HS256',
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
            })

            const refresh_token = jwt.sign(claims, process.env.JWT_REFRESH_TOKEN_KEY, {
                algorithm: 'HS256',
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
            })

            //jwt sent in response and will get verified using header
            // res.status(200).send({ msg: 'Login Successful', access_token: access_token });

            //jwt sent in cookie
            res.cookie('access_token', access_token, {
                httpOnly: true,
                maxAge: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
                // secure: true //for requests from https instead of http://localhost:3000/
            });
            //set refresh token as cookie
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
                // secure: true //for requests from https instead of http://localhost:3000/
            });
            res.status(200).send({ msg: 'Login Successful' });
        }
    });
}

const refresh = (req, res) => {
    const claims = {
        iss: req.claims.iss,
        sub: req.claims.sub,
        scope: req.claims.scope
    }
    try {
        const access_token = jwt.sign(claims, process.env.JWT_ACCESS_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
        })

        const refresh_token = jwt.sign(claims, process.env.JWT_REFRESH_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
        })

        //jwt sent in response and will get verified using header
        // res.status(200).send({ msg: 'Login Successful', access_token: access_token });

        //jwt sent in cookie
        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
            // secure: true //for requests from https instead of http://localhost:3000/
        });
        //set refresh token as cookie
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
            // secure: true //for requests from https instead of http://localhost:3000/
        });
        res.status(200).send({ msg: 'Login Successful' });
    }
    catch (e) {
        console.log(e);
    }
}


module.exports = {
    login,
    refresh
};

// for stolen devices(revoke access of refresh token)
// 1. refresh token in a valid for 7 days
// 2. persist(store) all the refresh token of the user generated by different devices in the db
// 3. when user say that I want to revoke access from all devices (facebook, amazon, telegram)
// 4. server will remove the refresh token from the db for all the devices of that user
// 5. at the time of validating the refresh token we need to see in the db weather that is present
//      for a particular user or not