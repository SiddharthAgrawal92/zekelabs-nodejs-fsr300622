//C++, Java, Python , JS

//doc_1
// {
//     _id: 1,
//     Name: "Kabul",
//     CountryCode: "AFG",
//     District: "Kabol",
//     Population: 1780000
// }

//doc_2
// {
//     _id: 2,
//     Name: "Qandahar",
//     CountryCode: "AFG",
//     District: "Kabol",
//     Population: 1780000
// }

//server - NodeJS/Java
//insert/updating --> 

// db.collection_name.insertMany([{
//     _id: 2,
//     Name: "Qandahar",
//     CountryCode: "AFG",
//     District: "Kabol",
//     Population: 1780000
// } ])

// World(DB)
//     - city(collection in nosql/tables in sql)
//         - doc_1 (document in nosql/rows in sql)
//         - doc_2
//     - country(collection)
//     - country(collection)

//Users - Signup
[
    {
        _id: 101,
        user_id: "abc@company.com",
        name: "Sid",
        email: "sid123@abc.com"
    },
    {
        _id: 102,
        user_id: "xyz@company.com",
        name: "Sid",
        email: "sid123@abc.com"
    }
]

// 1:many 
// many: 1
// many:many

//for list the accounts of a single user
//User can have multiple accounts with same Email ID


//Items(expectional)
[
    {
        _id: 201,
        product_id: 8091741097409179,
        custom_code: 1028
    }
]

// $db.users.find({name: "Sid"});
// $executing...
// $Result: [10 CURSOR>>, ....90]

//Replication --> Have a cloud instance of a MongoDB in the form of Cluster AWS, Azure, Google
//GEO Located Replica Sets
//Replica sets

//Indexing --> to get the search result as fast as possible


//CP --> General Case
// Intial Data --> Machine A({ email: "123@abc.com" })------------- Machine B({ email: "123@abc.com" })

// 1. Write Operation({ email: "321@abc.com" }) performed in Machine A
// Machine A({ email: "321@abc.com" })------X------- Machine B({ email: "123@abc.com" })

// 2. Read Operation from Machine-B will point to wrong data
// Machine A({ email: "321@abc.com" })------X------- Machine B({ email: "123@abc.com" })

//CP --> MongoDB Highly Consistent
// Intial Data --> Machine C({ email: "123@abc.com" })------Machine A({ email: "123@abc.com" })(MASTER)----X---Machine B({ email: "123@abc.com" })

// 1. Write Operation({ email: "321@abc.com" }) performed in Machine A(writes to the Master always)
// Machine C({ email: "123@abc.com" })-------Machine B({ email: "123@abc.com" })
//         |                                       |
//         |        _______________________________|
//         |        |
// Machine A({ email: "123@abc.com" })(MASTER BUT UNAVAILABLE)


// //Election will happen among the Slave Nodes in this case Between B & C to Assign a new master //operation-log

// Machine C({ email: "321@abc.com" })(MASTER)---X---Machine A({ email: "123@abc.com" })(MASTER BUT UNAVAILABLE)
//         |
//         |
//         |
// Machine B({ email: "321@abc.com" })

// // Note : When the Machine A is restored then data will get udpated in it from new master.

// Machine C({ email: "321@abc.com" })(MASTER)---RESTORED---Machine A({ email: "321@abc.com" })
//         |
//         |
//         |
// Machine B({ email: "321@abc.com" })


//Hierarchical Structure

//         Books
//         |
//     Programming
//          |
//          |
// Languages   Databases
//                 |
//                 |
//         MongoDB     DBM

// 1. Hierarchical Data Modelling With parent References
db.parentRefCollection.insertMany([
    { _id: "101", name: "MongoDB", parent: "Databases" },
    { _id: "102", name: "DBM", parent: "Databases" },
    { _id: "103", name: "Languages", parent: "Programming" },
    { _id: "104", name: "Databases", parent: "Programming" },
    { _id: "105", name: "Programming", parent: "Books" },
    { _id: "106", name: "Books", parent: null },
])

// give me all the docs of parent "Databases"
db.parentRefCollection.find({ parent: "Databases" });

//provide you the reference of parent in the doc named "MongoDB" you are searching
const parentOfMongoDB = db.parentRef.findOne({ name: "MongoDB" }).parent;
db.parentRef.findOne({ name: parentOfMongoDB });

_____________________________________________________________________________________________________________

// 2. Hierarchical Data Modelling With Child References
db.childRefCollection.insertMany([
    { _id: "101", name: "MongoDB", children: [] },
    { _id: "102", name: "DBM", children: [] },
    { _id: "103", name: "Languages", children: [] },
    { _id: "104", name: "Databases", children: ["MongoDB", "DBM"] },
    { _id: "105", name: "Programming", children: ["Languages", "Databases"] },
    { _id: "106", name: "Books", children: ["Programming"] }
])

//get all children docs of a name=Databases
const childrenRef = db.childRefCollection.findOne({ name: "Databases" }).children;
db.childRefCollection.find({ name: { $in: childrenRef } });

_______________________________________________________________________________________________________________

// 3. Hierarchical Data Modelling With Ancestry Array
db.ancestry.insertMany([
    { _id: "101", name: "MongoDB", ancestors: ["Books", "Programming", "Databases"], parent: "Databases" },
    { _id: "102", name: "DBM", ancestors: ["Books", "Programming", "Databases"], parent: "Databases" },
    { _id: "103", name: "Languages", ancestors: ["Books", "Programming"], parent: "Programming" },
    { _id: "104", name: "Databases", ancestors: ["Books", "Programming"], parent: "Programming" },
    { _id: "105", name: "Programming", ancestors: ["Books"], parent: "Books" },
    { _id: "106", name: "Books", ancestors: [], parent: null }
])

// give me all ancestors of "MongoDB"
const mongoDBAncestors = db.ancestry.findOne({ name: "MongoDB" }).ancestors;
db.ancestry.find({ name: { $in: mongoDBAncestors } });

_______________________________________________________________________________________________________________

// 4. Hierarchical Data Modelling With Materialized Paths
db.materializedPath.insertMany([
    { _id: "101", name: "MongoDB", path: ",Books,Programming,Databases," },
    { _id: "102", name: "DBM", path: ",Books,Programming,Databases," },
    { _id: "103", name: "Languages", path: ",Books,Programming," },
    { _id: "104", name: "Databases", path: ",Books,Programming," },
    { _id: "105", name: "Programming", path: ",Books," },
    { _id: "106", name: "Books", path: null }
])

db.materializedPath.find({ path: /,Programming,/ }) // to get all the descendants of Programming