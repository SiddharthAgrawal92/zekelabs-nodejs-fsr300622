
//## advantage of embedded docs 
//get all the data in a single shot
//scanned/fetched very fast

//## disadvantage of embedded docs
//rededundant data is created in the db
//db storage is increased
//over-fetching of data

//embedded
//collection - products
db.products.insertMany([
    {
        _id: 101,
        name: 'Biscuit',
        model: 'A101',
        ingredients: [
            { name: "flour", quality: "A" },
            { name: "sugar", quality: "B" },
            { name: "butter", quality: "A" },
            { name: "refined flour", quality: "B" },
        ],
        flavor: "sweet",
        size: "medium"
    },
    {
        _id: 102,
        name: 'Chocolate',
        model: 'A102',
        ingredients: [
            { name: "flour", quality: "A" },
            { name: "sugar", quality: "B" },
            { name: "butter", quality: "A" },
            { name: "cocoa", quality: "B" }
        ],
        flavor: "sweet",
        size: "large"
    }
])

//references
//products
db.products_ref.insertMany([
    {
        _id: 101,
        name: 'Biscuit',
        model: 'A101',
        ingredients: [1001, 1002, 1003, 1004],
        flavor: "Sweet",
        size: "medium"
    },
    {
        _id: 102,
        name: 'Chocolate',
        model: 'A102',
        ingredients: [1001, 1002, 1003, 1005],
        flavor: "Sweet",
        size: "large"
    }
]);

//ingredients
db.ingredients.insertMany([
    { _id: 1001, name: "flour", quality: "A" },
    { _id: 1002, name: "sugar", quality: "B" },
    { _id: 1003, name: "butter", quality: "A" },
    { _id: 1004, name: "refined flour", quality: "B" },
    { _id: 1005, name: "cocoa", quality: "B" }
]);


//aggregate
db.orders.insertMany([
    { name: "Pepperoni", size: "medium", quantity: 3, price: 210, cleared: false },
    { name: "Tandoori", size: "medium", quantity: 5, price: 159 },
]);
// db.orders.find({size: "medium"})
[
    {
        _id: ObjectId("6391f63bc2549b44cd02ca78"),
        name: 'Pepperoni',
        size: 'medium',
        quantity: 5,
        price: 210
    },
    {
        _id: ObjectId("6391f63bc2549b44cd02ca7b"),
        name: 'Tandoori',
        size: 'medium',
        quantity: 5,
        price: 159
    },
    {
        _id: ObjectId("639359adc2549b44cd02ca83"),
        name: 'Pepperoni',
        size: 'medium',
        quantity: 3,
        price: 210,
        cleared: false
    },
    {
        _id: ObjectId("639359adc2549b44cd02ca84"),
        name: 'Tandoori',
        size: 'medium',
        quantity: 5,
        price: 159
    }
]

db.orders.aggregate([
    { $match: { size: "medium" } },
    { $group: { _id: "$name", total: { $sum: "$quantity" } } }
])

db.orders.aggregate([
    { $match: { size: "medium" } },
    { $sort: { name: -1 } }
])

//internal operations in aggregate done in db
[
    {
        _id: "Pepperoni",
        //1. total = 0 --> total +=quantity;; 0+5 = 5
        // total: 5,
        //2. total = 5 --> total +=quantity;; 5+3 = 8
        total: 8,
    },
    {
        _id: "Tandoori",
        //1. total = 0 --> total +=quantity; 0+5 = 5
        // total: 5
        //2. total = 5 --> total +=quantity;; 5+5 = 10
        total: 10
    }
]