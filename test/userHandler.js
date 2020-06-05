const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

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
