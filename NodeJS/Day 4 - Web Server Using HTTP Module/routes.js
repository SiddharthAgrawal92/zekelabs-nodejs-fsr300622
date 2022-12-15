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
    switch (req.url) {
        case '/':
            handleHome(req, res);
            break;
        case '/users':
            handleUsers(req, res);
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
const handleUsers = (req, res) => {
    //Get user list
    if (req.method === 'GET') {
        const data = {
            userList: [{
                userName: 'a_101',
                fName: "ABC",
                lName: "XYZ"
            },
            {
                userName: 'b_101',
                fName: "MNO",
                lName: "PQR"
            }]
        }
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(data));
    }
    //Get a user by ID
    //
    //Create a user 
    else if (req.method === 'POST') {
        //use the events to capturing of data sent in body
    }
    //Update a user 
    else if (req.method === 'PUT') {
        //use the events to capturing of data sent in body
    }
    //Delete a user 
    else if (req.method === 'PUT') {
        //delete by ID
    }
    else {
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