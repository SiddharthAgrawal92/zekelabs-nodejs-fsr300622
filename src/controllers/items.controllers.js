const Items = require("../models/items.models");


const createBulkItems = async (req, res) => {
    const result = await Items.insertMany(req.body.itemList).catch(err => {
        return res.status(500).send({ error: 'Internal Server Error' });
    });
    res.status(201).send({ itemList: result });
}

const getItems = async (req, res) => { //for first 50 skip=0 & limit=50 || for next 50 skip=50 & limit=50
    const totalItems = await Items.countDocuments().catch(e => {
        return res.status(500).send({ error: 'Internal Server Error' });
    });
    Items.find({}).skip(req.query.skip).limit(req.query.limit).sort({ [req.query.sortBy]: req.query.sortOrder }).exec((err, itemList) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        res.status(200).send({ itemList: itemList, totalItems: totalItems });
    });
}

const updateItem = (req, res) => {
    const io = req.app.get('socket-io');
    Items.findByIdAndUpdate(req.params.itemId, req.body, { new: true }, (err, updatedItem) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        res.status(200).send({ updatedItem: updatedItem });
        io.emit('item-updated', updatedItem);
    })
}

//delete the item and also delete a particular item from all views in the client from socket
const deleteItem = () => {

}

//add the item and also add a particular item from all views in the client from socket
const createItem = () => {

}

module.exports = {
    createBulkItems,
    getItems,
    updateItem
}