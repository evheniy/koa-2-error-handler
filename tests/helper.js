const chai = require('chai');
const expect = chai.expect;
const helper = require('./../index').helper;

describe('Helper test', () => {

    it('it should test normal port', async () => {
        return expect(helper(3000)).to.be.equal(3000);
    });

    it('it should test string port', async () => {
        return expect(helper('3000')).to.be.equal(3000);
    });

    it('it should test wrong value', async () => {
        try {
            helper('test');
        } catch (error) {
            expect(error).is.not.undefined;
            expect(error.message).to.be.equal('Port should be numeric value!');
        }
        return true;
    });

    it('it should test wrong value with own message', async () => {
        try {
            helper('test', 'testing');
        } catch (error) {
            expect(error).is.not.undefined;
            expect(error.message).to.be.equal('testing');
        }

        return true;
    });
});