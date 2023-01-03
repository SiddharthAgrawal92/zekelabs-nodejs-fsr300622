const env = process.env.NODE_ENV;

const dev = {
    DB_CONNECTION_STRING: 'mongodb+srv://sid1605:C7EDvQdwOjw26Gae@cluster0.tf4ffv5.mongodb.net/test'
}

const test = {
    DB_CONNECTION_STRING: 'mongodb+srv://sid1605:C7EDvQdwOjw26Gae@cluster0.tf4ffv5.mongodb.net/company'
}

const config = {
    dev,
    test
}

module.exports = config[env];