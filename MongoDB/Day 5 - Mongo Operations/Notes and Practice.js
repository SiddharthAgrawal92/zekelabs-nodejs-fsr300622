
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
        //1. totalCost = 0 --> totalCost += (price*quantity); 0+1060 = 1060
        // total: 5,
        // totalCost: 1060,
        //2. total = 5 --> total +=quantity;; 5+3 = 8
        //2. totalCost = 1060 --> totalCost += (price*quantity); 1060+636 = 1696
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

// totalCost += (price*quantity) --> total = total + (price*quantity);

//aggregate total cost
db.orders.aggregate(
    [
        { $match: { size: "medium" } },
        {
            $group: {
                _id: "$name",
                name: { $first: "$name" },
                size: { $last: "$size" },
                count: { $sum: 1 },
                totalOrderQuantity: { $sum: "$quantity" },
                totalCost: { $sum: { $multiply: ["$price", "$quantity"] } }
            }
        },
        { $project: { _id: 0 } },
        { $sort: { _id: 1, totalOrderQuantity: -1, count: 1 } },
        { $merge: "orders_summary" }
    ]
)

// { $out: "orders_summary" }

//1. out -> This will overwrite the returned documents into the collection (and db if you mention)
// Note: a new collection is created if doesn't exist
//internally with "out" db clones the existing collection in temporary database created a new collection with new docs
//  and then copies the name to this new collection and drops the existing one.

//2. merge -> This will simple write/update(find if matched already exist and updates them if not then creates one)
//into the collection

db.products.insertMany([
    {
        _id: 101,
        name: 'Biscuit',
        model: 'A101',
        ingredients: [
            { name: "flour", quality: "A" },
            { name: "sugar", quality: "B" },
        ],
        flavor: "sweet",
        size: "medium"
    },
    {
        _id: 102,
        name: 'Chocolate',
        model: 'A102',
        ingredients: [
            { name: "butter", quality: "C" },
            { name: "cocoa", quality: "D" }
        ],
        flavor: "sweet",
        size: "large"
    }
])

//match element props from array of objects
//method-1
db.products.find({ "ingredients.quality": "C" });
//method-2
db.products.find({
    ingredients: { $elemMatch: { quality: "C", name: "flour" } }
});

//for updating element props in array of objects
db.products.updateMany(
    { "ingredients.quality": "C" },
    { $set: { "ingredients.$[element].quality": "B" } },
    { arrayFilters: [{ "element.quality": "C" }] }
);

//MongoDB Cloud Cluster
//sid1605
//U0zj4zB4ogfxXbAA

// ReactJS--> http://localhost:3000
// NodeJS--> http://localhost:8080
// MongoDB--> mongodb://localhost:27017(localmachine) 
// MongoDB--> mongodb+srv://sid1605:U0zj4zB4ogfxXbAA@cluster0.tf4ffv5.mongodb.net/test(Cloud Cluster) 

//mongodb+srv://sid1605:QxunT2Uyi2cj9L6Q@cluster0.3o8fgzr.mongodb.net/test

//Mongoose is a NPM package for doing the MongodB operations from the Javascript code