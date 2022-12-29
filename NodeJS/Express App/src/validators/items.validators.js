const { check, validationResult, query } = require('express-validator');

const validateCreateBulkItems = async (req, res, next) => {

    await check('itemList', 'itemList is required').exists().run(req);
    await check('itemList', 'itemList should be an array').isArray().run(req);

    //username
    await check('itemList.*.name', 'name is required').exists().run(req);
    await check('itemList.*.name', 'name should be a string').isString().run(req);
    await check('itemList.*.name', 'name length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    //category
    await check('itemList.*.category', 'category is required').exists().run(req);
    await check('itemList.*.category', 'category should be a string').isString().run(req);
    await check('itemList.*.category', 'category length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    //size
    await check('itemList.*.size', 'size is required').exists().run(req);
    await check('itemList.*.size', 'size should be a string').isString().run(req);
    await check('itemList.*.size', 'size length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    //quantity
    await check('itemList.*.quantity', 'quantity is required').exists().run(req);
    await check('itemList.*.quantity', 'quantity should be a number').isNumeric().run(req);
    await check('itemList.*.quantity', 'quantity length should be in range [1-1000000]').isLength({ min: 1, max: 1000000 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}

const validateGetItems = async (req, res, next) => {
    await query('skip', 'skip query params should be a numeric value in range [0-50]').optional().isNumeric().custom((value) => value && (value > 50 || value < 0) ? false : true).run(req);
    await query('limit', 'limit query params should be a numeric value in range [1-50]').optional().isNumeric().custom((value) => value && (value > 50 || value) < 1 ? false : true).run(req);

    await query('sortBy', `invalid sortBy should be one of ['name', 'category', 'size']`).optional().isString().isIn(['name', 'category', 'size']).run(req);
    await query('sortOrder', `invalid sortOrder should be one of ['1', '-1']`).optional().isNumeric().isIn(['1', '-1']).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}

module.exports = {
    validateCreateBulkItems,
    validateGetItems
}