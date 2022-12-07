//users
[
    {
        name: String,
        profession: String
    },
    {
        name: String,
        age: Number,
        tags: Array
    }
]

//BSON <--> JSON (in MongoDB Database)
// 1. You fire a query to insert a JSON document({name: "Sid"})
// 2. MongoDB will convert JSON document into BSON to store it in Database
// 3. You fire another query({name: "Sid"}) to retrieve the JSON Document
// 4. MongoDB will do the scanning if BSON document found with given query, it will convert the
//      BSON document into JSON and return it to the calling place

//Basic Commands in MongoDB

// To Clear a mongo Shell and browser console
// > Hold CTRL then press L

// 1. Switch to a Database
// >use <<dn_name>>

// 2. Show all collections of a Database
// >show collections

// 3. Show all Databases
// >show dbs

// 4. Drop the collections
// >db.<collection_name>.drop()

// 5. Insert a Document in a Collection
// >db.<collection_name>.insertOne({JSON_DOC in the key: value format})

// 6. Insert Many Documents in a Collection
// >db.<collection_name>.insertMany([{JSON_DOC in the key: value format}, ...{}])


// 7. Find a Document in a Collection (it will give the first matching document from the collection even if other docs are also present with the matching criteria)
// >db.<collection_name>.findOne({}) --> query for matching criteria, e,g: {_id: 101}

// 8. Find all Document in a Collection (it will give all the matching documents based on the matching criteria)
// >db.<collection_name>.find({}) --> query for matching criteria, e,g: {_id: 101}

// 9. Operators >=, <=, >, <
// >db.<collection_name>.find({amount : { $gte: 5000 } });
