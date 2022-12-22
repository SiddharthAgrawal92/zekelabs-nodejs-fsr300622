const { MongoClient, ObjectId } = require('mongodb');

const getMongoClient = async () => {
    const clusterConnectionString = "mongodb+srv://sid1605:C7EDvQdwOjw26Gae@cluster0.tf4ffv5.mongodb.net/test"
    return new MongoClient(clusterConnectionString, { monitorCommands: true });
}

const getUserList = async () => {
    const dbClient = await getMongoClient().catch(console.error);
    try {
        await dbClient.connect().catch(err => console.error(err));
        //
        const itemList = await dbClient.db('company').collection('users').find({}).toArray();
        return { itemList: itemList };
    } catch (err) {
        console.error(err);
        return
    } finally {
        await dbClient.close();
    }
}

const createUser = async (userObj) => {
    const dbClient = await getMongoClient().catch(console.error);
    try {
        await dbClient.connect().catch(err => console.error(err));
        //
        const insertedUser = await dbClient.db('company').collection('users').insertOne(userObj);
        // insertOne(insertedId) & insertMany(insertedIds)        
        return insertedUser;
    } catch (err) {
        console.error(err);
        return
    } finally {
        await dbClient.close();
    }
}

const updateUser = async (userId, userObj) => {
    const dbClient = await getMongoClient().catch(console.error);
    try {
        await dbClient.connect().catch(err => console.error(err));
        const updatedUser = await dbClient.db('company').collection('users').updateOne({ _id: ObjectId(userId) }, { $set: userObj });
        return updatedUser;
    } catch (err) {
        console.error(err);
        return
    } finally {
        await dbClient.close();
    }
}

const deleteUser = async (userId) => {
    const dbClient = await getMongoClient().catch(console.error);
    try {
        await dbClient.connect().catch(err => console.error(err));
        const updatedUser = await dbClient.db('company').collection('users').deleteOne({ _id: ObjectId(userId) });
        return updatedUser;
    } catch (err) {
        console.error(err);
        return
    } finally {
        await dbClient.close();
    }
}

module.exports = {
    getUserList,
    createUser,
    updateUser,
    deleteUser
}