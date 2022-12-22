const path = require('path');
const routes = require('express').Router();
const UserRoutes = require('./users.routes');

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
// routes.use('/items', ItemsRoutes);
// routes.use('/products', ProductsRoutes);
// routes.use('/players', PlayersRoutes);

routes.use((req, res) => {
    // res.status(404).send({ msg: 'URL Not found!' });
    res.status(404).sendFile(path.resolve(__dirname, '../../public/notFound.html')); //send a file
});

module.exports = routes;