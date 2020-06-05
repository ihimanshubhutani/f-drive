const { expect } = require('chai');
const sinon = require('sinon');
const validator = require('../middleware/validator');

describe('Test the middleware function validator', () => {
    it('Should call next()', (done) => {
        const req = {
            body: {
                username: "himmybhuta",
                email: "bhutanihimanshufgdh98@gmail.com",
                password: "himanshu@98"
            },
        };
        const nextSpy = sinon.spy();
        validator(req, {}, nextSpy).then(() => {
            expect(nextSpy.calledOnce).to.be.true;
            done();
        });

    });



});

