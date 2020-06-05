const { expect } = require('chai');
const sinon = require('sinon');
const validator = require('../middleware/validator');

describe('Test the middleware function validator', () => {
    it('Should call next once', () => {
        var stub = sinon.stub(validator, "isUsernameAlreadyExists");
        stub.returns(true);
        const req = {
            body: {
                username: "himmybhutani",
                email: "bhutanihimanshu98@gmail.com",
                password: "himanshu@98"
            },
        };
        const nextSpy = sinon.spy();
        validator(req, {}, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
    });

});

