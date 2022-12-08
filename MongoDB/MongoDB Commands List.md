1. Database Commands
    ## View all databases
    $show dbs

    ## Create a new or switch databases 
    $use dbName

    ## View current Database
    $db

    ## Delete Database 
    $db.dropDatabase()

2. Collection Commands
    ## Show Collections
    $show collections

    ## Create a collection named 'comments'
    $db.createCollection('comments')

    ## Drop a collection named 'comments'
    $db.comments.drop()

3. Document Commands
    ## Show all documents in a Collection 
    $db.comments.find()

    ## Show all Documents in a Collection (Prettified)
    $db.comments.find().pretty()

    ## Find the first document matching the object
    $db.comments.findOne({name: 'John'})

    ## Insert One Document
    $db.comments.insert({
        'name': 'John',
        'lang': 'JavaScript',
        'member_since': 5
    })

    ## Insert many documents
    $db.comments.insertMany([{
        'name': 'John',
        'lang': 'JavaScript',
        'member_since': 5
        }, 
        {'name': 'Paula',
        'lang': 'Python',
        'member_since': 3
        },
        {'name': 'Kevin',
        'lang': 'Java',
        'member_since': 4
    }])


    ## Search in a MongoDb Database
    $db.comments.find({lang:'Python'})

    ## Limit the number of documents in output
    $db.comments.find().limit(2)

    ## Count the number of Documents in the output
    $db.comments.find().count()

    ## Update a document(deprecated use updateOne() instead)
    $db.comments.update({name: 'Shubham'},
    {$set: {'name': 'John',
        'lang': 'JavaScript',
        'member_since': 51
    }})

    ## Update multiple documents(deprecated use updateMany() instead)
    $db.comments.update({lang: 'JavaScript'},
        {$set: {'lang': 'JS'}},
        { multi: true}
    )

    ## Mongodb Increment Operator
    $db.comments.update({name: 'Paula'},
    {$inc:{
        member_since: 2
    }})
    Note - Decrement is similar to increment just use "-" sign for decreasing the value as shown below
    {$inc:{
        member_since: -1
    }})

    ## Mongodb Rename Operator
    $db.comments.update({name: 'Paula'},
    {$rename:{
        member_since: 'member'
    }})

    ## Delete one document
    #db.comments.deleteOne({name: 'Paula'})

    ## Delete all documents (deprecated)
    $db.comments.remove({name: 'John'})

    ## Delete all documents
    $db.comments.deleteMany({name: 'John'}) 
    

    ## Less than/Greater than/ Less than or Eq/Greater than or Eq
    $db.comments.find({member_since: {$lt: 90}})

    $db.comments.find({member_since: {$lte: 90}})

    $db.comments.find({member_since: {$gt: 90}})

    $db.comments.find({member_since: {$gte: 90}})