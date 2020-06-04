const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const sinon = require('sinon');
const userDataHandler = require('../controller/user-dataHandler');

const { expect } = chai;
chai.use(chaiHttp);

/**
 * Checks server responds
 */
describe('Server responds', () => {
    it('Should Responds with status 200', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should Open Login page', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.text).to.include('Login to Your F-Drive Account');
                done();
            });
    });

});

describe('Logging in ', () => {
    const invalidCredentials = {
        username: "himanshubhutani",
        password: "123456"
    };
    const validCredentials = {
        username: "himanshubhutani",
        password: "deqode@123"
    }
    it('Should respond with status 401 on invalid credentials', done => {
        chai.request(app)
            .post('/login')
            .send(invalidCredentials)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    })

    it('Should respond with status 200 on valid credentials', done => {
        /**
        * Spy authenticate user function
        */
        const spy = sinon.spy(userDataHandler, 'authenticateUser');
        chai.request(app)
            .post('/login')
            .send(validCredentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect('Location', '/');
                console.log(spy);
                done();
            })

    })
})
