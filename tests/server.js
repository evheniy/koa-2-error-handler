const EventEmitter = require('events');
const chai = require('chai');
const expect = chai.expect;
const serverHandler = require('./../index').server;
let server;

describe('Server test', () => {

    beforeEach(done => {
        server = new EventEmitter();
        done();
    });

    it('it should test listening event with pipe', done => {
        server.address = () => 'test';
        serverHandler(server, bind => {
            expect(bind).to.be.equal('pipe test');
            done();
        });
        server.emit('listening');
    });

    it('it should test listening event with port', done => {
        server.address = () => ({ port: 3000});
        serverHandler(server, bind => {
            expect(bind).to.be.equal('port 3000');
            done();
        });
        server.emit('listening');
    });
});