const url = require('url');
const { getUserList, createUser, updateUser, deleteUser } = require('./db');

const requestHandler = (req, res) => { //requestHandler we need to pass for handling the request
    //url
    // '/' --> Home
    // '/users' --> GET user list
    //handling routes by method
    // switch (req.method) {
    //     case 'GET':
    //         handleGETRequest(req, res);
    //         break;
    //     case 'POST':
    //         handlePOSTRequest(req, res);
    //         break;
    //     default:
    //         res.end('Method for this HTTP request is not yet supported!');
    //         break;
    // }

    // handling routes by module URLs
    const parsedUrl = url.parse(req.url);
    let pathParam = parsedUrl.pathname.split('/');
    parsedUrl.pathname = `/${pathParam[1]}`;
    if (pathParam.length > 2) {
        pathParam = pathParam[2];
    } else {
        pathParam = null;
    }
    switch (parsedUrl.pathname) {
        case '/':
            handleHome(req, res);
            break;
        case '/users':
            handleUsers(req, res, pathParam);
            break;
        default:
            res.writeHead(404);
            res.end('This URL is not supported!');
            break;
    }
}

/**
 * Method to handle home url
 * @param {*} req - HTTP Request Object
 * @param {*} res - HTTP Response Object
 */
const handleHome = (req, res) => {
    if (req.method === 'GET') {
        const success_message = 'Hello From Server';
        res.writeHead(200);
        res.end(success_message);
    } else {
        res.writeHead(404);
        res.end('Method for this HTTP request is not yet supported!');
    }
}

/**
 * Method to handle Users module URLs
 * @param {*} req - HTTP Request Object
 * @param {*} res - HTTP Response Object
 */
const handleUsers = async (req, res, pathParam) => {
    //Get user list
    if (req.method === 'GET') {
        let result = await getUserList().catch(err => {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(500);
            res.end(JSON.stringify({ errorMessage: "Internal Server Error" }));
        })
        if (result) {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(result));
        }
    }
    //Get a user by ID
    //
    //Create a user 
    else if (req.method === 'POST') {
        //use the events to capturing of data sent in body
        //adding event listener from request
        let body = '';
        req.on('data', chunk => {
            //1+ '1' --> '11'
            body += chunk;
        });
        req.on('end', async () => {
            //all chunks has been sent successfully            
            const result = await createUser(JSON.parse(body)).catch(err => {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(500);
                res.end(JSON.stringify({ errorMessage: "Internal Server Error" }));
            })
            if (result) {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify(result));
            }
        });
    }
    //Update a user 
    else if (req.method === 'PUT') {
        const query = url.parse(req.url, true).query;
        if (query.userId) {
            let body = '';
            //use the events to capturing of data sent in body
            req.on('data', chunk => {
                //1+ '1' --> '11'
                body += chunk;
            });
            req.on('end', async () => {
                //all chunks has been sent successfully            
                const result = await updateUser(query.userId, JSON.parse(body)).catch(err => {
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(500);
                    res.end(JSON.stringify({ errorMessage: "Internal Server Error" }));
                })
                if (result) {
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end(JSON.stringify(result));
                }
            });
        } else {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify({ errorMessage: "userId is required in the query param" }));
        }
    }
    //Delete a user 
    else if (req.method === 'DELETE') {
        //delete by ID
        if (pathParam) {
            const result = await deleteUser(pathParam).catch(err => {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(500);
                res.end(JSON.stringify({ errorMessage: "Internal Server Error" }));
            })
            if (result) {
                if (result.deletedCount) {
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end(JSON.stringify({ successMsg: 'User has been updated successfully' }));
                } else {
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(404);
                    res.end(JSON.stringify({ errorMessage: 'No record found with that userId' }));
                }
            }
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify({ errorMessage: "userId is required in the url path" }));

        }
    } else {
        res.writeHead(404);
        res.end('Method for this HTTP request is not yet supported!');
    }
}

// const handleGETRequest = (req, res) => {
//     if (req.url == '/') {
//         const success_message = 'Hello From Server';
//         res.writeHead(200);
//         res.end(success_message);
//     } else if (req.url == '/users') {
//         // database.crud.then(res => {
//         //http -> 200 201, 202, 400, 401, 402
//         const data = [{
//             userName: 'a_101',
//             fName: "ABC",
//             lName: "XYZ"
//         }]
//         res.setHeader("Content-Type", "application/json");
//         res.writeHead(200);
//         res.end(JSON.stringify(data));
//         // const error_message = 'Internal Server Error';
//         // res.writeHead(400);
//         // res.end(error_message);
//         // });
//     }
// }

// const handlePOSTRequest = (req, res) => {
// }

module.exports = requestHandler;

// http standard
//                  headers     Body            params          e.g.
// GET(list)    --> test/auth    NR             query/path     /users/101, /users?userId=101
// POST(Create) --> test/auth    Yes            NR             /users
// PUT(Update)  -->  test/auth   Yes            Maybe/May Not  /users, /users/101, /users?userId=101
// Delete(Remove)--> test/auth   Maybe/May Not  Yes            /users/101, /users?userId=101
// Delete(Many)  --> test/auth   [101, 102]     Yes            /users/101, /users?userId=101,102,103

//*NR=Not Required as per the standard - but you can send it