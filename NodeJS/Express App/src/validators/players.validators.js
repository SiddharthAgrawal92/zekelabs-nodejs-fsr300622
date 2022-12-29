const { check, validationResult, query } = require('express-validator');

const validateCreatePlayer = async (req, res, next) => {

    await check('name', 'name is required').exists().run(req);
    await check('name', 'name should be a string').isString().run(req);
    await check('name', 'name length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    await check('sports', 'sports is required').exists().run(req);
    await check('sports', 'sports should be a string').isString().run(req);
    await check('sports', 'sports length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    await check('country', 'country is required').exists().run(req);
    await check('country', 'country should be a string').isString().run(req);
    await check('country', 'country length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    await check('club', 'club is required').exists().run(req);
    await check('club', 'club should be a string').isString().run(req);
    await check('club', 'club length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    await check('image', 'image is required').exists().run(req);
    await check('image', 'image should be a string').isString().run(req);
    await check('image', 'image length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}
const validateGetPlayer = async (req, res, next) => {
    await query('skip', 'skip query params should be a numeric value in range [0-30]').optional().isNumeric().custom((value) => value && (value > 30 || value < 0) ? false : true).run(req);
    await query('limit', 'limit query params should be a numeric value in range [1-30]').optional().isNumeric().custom((value) => value && (value > 30 || value < 1) ? false : true).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}

module.exports = {
    validateCreatePlayer,
    validateGetPlayer
}