const { check, validationResult } = require('express-validator');


const validateLogin = async (req, res, next) => {
    await check('userName', 'userName is required').exists().run(req);
    await check('password', 'password is required').exists().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}

module.exports = {
    validateLogin
}