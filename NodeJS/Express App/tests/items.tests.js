const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const jwt = require('jsonwebtoken');

chai.should();
chai.use(chaiHttp);

describe('For Items', () => {

    it('It should GET all the items', done => {
        const token = jwt.sign({ iss: 'For_Testing_POST_ITEMS' }, process.env.JWT_ACCESS_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
        })
        //req.url = GET --> /posts token in request cookie
        chai.request(server).get('/items').set('Cookie', `access_token=${token}`).end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.itemList.should.be.a('array');
            response.body.totalItems.should.be.a('number');
            done();
        })
    })

    it('It should POST Bulk the items', done => {
        const token = jwt.sign({ iss: 'For_Testing_POST_ITEMS' }, process.env.JWT_ACCESS_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
        })
        //req.url = GET --> /posts token in request cookie
        chai.request(server).post('/items/bulk').set('Cookie', `access_token=${token}`).send({
            itemList: [
                { name: 'ABC_101', category: 'Snacks', size: 'medium', quantity: 123 },
                { name: 'ABC_102', category: 'Snacks', size: 'medium', quantity: 456 },
                { name: 'ABC_102', category: 'Grocery', size: 'medium', quantity: 789 }
            ]
        }).end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.itemList.should.be.a('array');
            done();
        })
    })

    //todo
    it('It should POST Single item', done => {
        //write code here
    })

    it('It should PUT Single item', done => {
        //write code here
    })

    it('It should DELETE Single item', done => {
        //write code here
    })

})