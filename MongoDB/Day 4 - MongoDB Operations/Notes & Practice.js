// expenses: [{name: "Grocery"}, {name: "Others"}, {name: "Petrol"}]

//db.expenses.find({name: "Grocery"}); name="Grocery"

//db.expenses.find({name: { $in: ["Grocery", "Petrol"] } }); name="Grocery" && "Petrol"

//db.expenses.find({amount: 5000 }); =5000

//db.expenses.find({amount: { $gte: 5000 } }); >=5000

//is UI(react-js or any UI app or client) allowed to pass certain field only on the API(endpoint)

[
    { name: "Pepperoni", size: "large", quantity: 1, price: 350, cleared: true },
    { name: "Pepperoni", size: "medium", quantity: 3, price: 225, cleared: false },
    { name: "Pepperoni", size: "small", quantity: 4, price: 120 },
    { name: "Tandoori", size: "large", quantity: 1, price: 300 },
    { name: "Tandoori", size: "medium", quantity: 3, price: 185 },
    { name: "Tandoori", size: "small", quantity: 4, price: 80 },
    { name: "Veggie", size: "large", quantity: 2, price: 280 },
    { name: "Veggie", size: "medium", quantity: 2, price: 155 },
    { name: "Veggie", size: "small", quantity: 2, price: 75 }
]

"6391f63bc2549b44cd02ca77"

//CRUD
//Create - insertOne & insertMany
//Read - findOne & find
//Update - update() this is deprecated, --> updateOne(new method)
//        & update({multi: true}) --> updateMany(new method)

//single master -->  write --> read
//where when UI is making a call for an update and need the updated values back


//update order and if this order doesn't exit then create a new order with the following fields
// we need to send the orderId to the customer
// db.orders.findOneAndUpdate(
//     { _id: ObjectId("6391f63bc2549b44cd02ca00") },
//     { $set: { name: "Cheezelious", size: "large", quantity: 1, price: 420 } },
//     { upsert: true }
// )
// {
//     insertId: ObjectId(""),
//     matchedCount: 0,
//     modifiedCount: 0,
//     upsertedCount: 1
// }



[
    { name: "Raja", marks: 90, cleared: true },
    { name: "Sid", marks: 80, cleared: true },
    { name: "XYZ", marks: 20, cleared: false }
]

// mongodb we can ask for "executionStats"
db.order.find({name: "Veggie"}) // stats
db.order.createIndex({name: 1}) // index created
db.order.find({name: "Veggie"}) // stats