const getUsers = (req, res) => {
    let itemList = [{ name: "Item_1" }, { name: "Item_2" }];
    res.send({ itemList, query: req.query }); //sends the response and ends the request
    // res.json(null); //sends the response and ends the request but it also parses null & undefined
}

const createUser = (req, res) => {
    let itemList = [{ name: "Item_1" }, { name: "Item_2" }];
    res.send(itemList);
}

const createBulkUsers = (req, res) => {
    let itemList = [{ name: "Item_1" }, { name: "Item_2" }];
    res.send(itemList);
}

const updateUser = (req, res) => {
    res.send({ params: req.params });
}


module.exports = {
    getUsers,
    createUser,
    createBulkUsers,
    updateUser
}