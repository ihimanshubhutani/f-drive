const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app').default;
const userDataHandler = require('../controller/userDataHandler').default;

const { expect } = chai;
chai.use(chaiHttp);

const spy = sinon.spy(userDataHandler, 'authenticateUser');
/**
 * Checks server responds
 */
// eslint-disable-next-line no-undef
describe('Server responds', () => {
  // eslint-disable-next-line no-undef
  it('Should Responds with status 200', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('Should Open Login page', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.include('Login to Your F-Drive Account');
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe('Logging in ', () => {
  const invalidCredentials = {
    username: 'himanshubhutani',
    password: '123456',
  };
  const validCredentials = {
    username: 'himanshubhutani',
    password: 'deqode@123',
  };
  // eslint-disable-next-line no-undef
  it('Should respond with status 401 on invalid credentials', (done) => {
    chai
      .request(app)
      .post('/login')
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('Should respond with status 200 on valid credentials', (done) => {
    chai
      .request(app)
      .post('/login')
      .send(validCredentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Location', '/');
        console.log(spy.called);
        done();
      });
  });
});
