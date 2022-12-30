const { check, validationResult } = require('express-validator');


const validateCreateUser = async (req, res, next) => {
    //username
    await check('userName', 'userName is required').exists().run(req);
    await check('userName', 'userName should be a string').isString().run(req);
    await check('userName', 'userName should an email').isEmail().run(req);
    await check('userName', 'userName length should be in range [5-30]').isLength({ min: 5, max: 30 }).run(req);

    //firstName & lastName
    //bail() is used to stop the call to the next validator in chain    
    // await check('firstName', 'name is invalid').exists().bail().isString().run(req);
    await check('firstName', 'firstName is required').exists().run(req);
    await check('firstName', 'firstName should be a string').isString().run(req);
    await check('firstName', 'firstName should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);
    await check('lastName', 'lastName is required').exists().run(req);
    await check('lastName', 'lastName should be a string').isString().run(req);
    await check('lastName', 'lastName should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    //password
    await check('password', 'password is required').exists().run(req);
    await check('password', 'password should be a string').isString().run(req);
    await check('password', 'password should be a strong that should contain at least 1 lowercase, 1 uppercase, 1 symbol and should be of at least 8 character').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).run(req);

    // role
    await check('role', 'role is required').exists().run(req);
    await check('role', 'role should be a string').isString().run(req);
    await check('role', 'role is invalid').isIn(['admin', 'user', 'developer']).run(req);

    // mobileNumber
    await check('mobileNumber', 'mobileNumber is required').exists().run(req);
    await check('mobileNumber', 'mobileNumber should be a number').isNumeric().run(req);
    await check('mobileNumber', 'mobileNumber should be of 10 digits').isLength({ min: 10, max: 10 }).run(req);

    //subscription
    // await check('subscription', 'subscription is required').exists().run(req);
    // await check('subscription', 'subscription should be a string').isString().run(req);
    //sanitization
    //replace value to a new one
    // await check('subscription').replace('Package1', 'Subscription_101').run(req);
    //convert to lowercase
    // await check('subscription').toLowerCase().run(req);
    // //trim the unneccesary spaces    
    // await check('note').escape().trim().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}

module.exports = {
    validateCreateUser
}