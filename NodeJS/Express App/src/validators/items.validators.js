const { check, validationResult } = require('express-validator');

const validateCreateBulkItems = async (req, res, next) => {

    await check('itemList', 'itemList is required').exists().run(req);
    await check('itemList', 'itemList should be an array').isArray().run(req);

    //username
    await check('itemList.*.itemName', 'itemName is required').exists().run(req);
    await check('itemList.*.itemName', 'itemName should be a string').isString().run(req);
    await check('itemList.*.itemName', 'itemName length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    //category
    await check('itemList.*.itemCategory', 'itemCategory is required').exists().run(req);
    await check('itemList.*.itemCategory', 'itemCategory should be a string').isString().run(req);
    await check('itemList.*.itemCategory', 'itemCategory length should be in range [2-30]').isLength({ min: 2, max: 30 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}

module.exports = {
    validateCreateBulkItems
}