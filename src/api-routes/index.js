const path = require('path');
const routes = require('express').Router();
const UserRoutes = require('./users.routes');
const AuthRoutes = require('./auth.routes');
const ItemsRoutes = require('./items.routes');
const playerRoutes = require('./players.routes');
const verifyToken = require('../middleware/auth.middleware');

routes.get('/', (req, res) => {
    // res.send({ msg: 'Hello from server' });
    // res.render('index', { title: 'Home', message: "Welcome to Our Server!" });
    let jadeTemplateData = {
        studentList: [{ name: 'Siddharth' }, { name: 'Adam' }]
    }
    res.render('index2', jadeTemplateData);
});

//------handle module-wise API endpoints-----//
routes.use('/users', UserRoutes);
routes.use('/auth', AuthRoutes);
routes.use('/items', ItemsRoutes);
routes.use('/players', verifyToken, playerRoutes);
// routes.use('/products', ProductsRoutes);
// routes.use('/players', PlayersRoutes);

routes.use((req, res) => {
    // res.status(404).send({ msg: 'URL Not found!' });
    res.status(404).sendFile(path.resolve(__dirname, '../../public/notFound.html')); //send a file
});

module.exports = routes;


//e-commerce, portal, dashboard
//1. User Registration
//2. Login --> authentication(Role - admin, developer, user, public_user)

//JWT token --> authorization

//Role Admin is  authorized to request for -->
// 1. get all users endpoint (/users, GET)
// 2. get all financial details of company  (/finance, GET)
// 3. get all products (/products, GET)
// 4. add product to cart  (/card, post)

//Role public_user is  authorized to request for -->
// 1. get all products (/products, GET)
// 2. add product to cart  (/card, post)


//JWT --> create/sign JWT we need to give a private key(?D(G+KbPeShVmYq3t6w9z$C&F)H@McQf36) from which we generate it
//

// // typescript
// let foo = "";
// foo = {};//type error