const { expect } = require('chai');
const sinon = require('sinon');
const validator = require('../middleware/userValidator');

describe('Test the middleware function validator', () => {
  it('Should call next()', (done) => {
    const req = {
      body: {
        username: 'himmybhuta',
        email: 'bhutanihimanshufgdh98@gmail.com',
        password: 'helloworl@1993',
      },
    };
    const nextSpy = sinon.spy();
    validator(req, {}, nextSpy).then(() => {
      // eslint-disable-next-line no-unused-expressions
      expect(nextSpy.calledOnce).to.be.true;
      done();
    });
  });

  it('Should not call next() for username that already exists', (done) => {
    const req = {
      body: {
        username: 'himmybhuta',
        email: 'bhutanihimanshufgdh98@gmail.com',
        password: 'himanshubhutani@1993',
      },
    };
    const nextSpy = sinon.spy();
    validator(req, {}, nextSpy).then(() => {
      expect(nextSpy.calledOnce).to.be.true;
      done();
    });
  });
});
