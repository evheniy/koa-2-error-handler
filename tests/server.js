/*eslint no-console: 0*/
const EventEmitter = require('events');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const serverHandler = require('./../index').server;
let server, stub;

describe('Server test', () => {

    beforeEach(() => {
        server = new EventEmitter();
        stub = Object.getOwnPropertyDescriptor(process, 'exit');
        Object.defineProperty(process, 'exit', {
            value: code => expect(code).to.be.equal(1)
        });
        sinon.stub(console, 'error', text => expect(text).to.be.equal(text));
    });

    afterEach(() => {
        server = new EventEmitter();
        Object.defineProperty(process, 'exit', stub);
        console.error.restore();
    });

    it('it should test listening event with pipe', done => {
        server.address = () => 'test';
        serverHandler(server, address => {
            expect(address).to.be.equal('pipe test');
            done();
        });
        server.emit('listening');
    });

    it('it should test listening event with port', done => {
        server.address = () => ({ port: 3000});
        serverHandler(server, address => {
            expect(address).to.be.equal('port 3000');
            done();
        });
        server.emit('listening');
    });

    it('it should test clientError event with port', done => {
        const error = new Error('test');
        const socet = {
            end(text) {
                expect(text).to.be.equal('HTTP/1.1 400 Bad Request\r\n\r\n');
            }
        };
        server.address = () => ({ port: 3000});
        serverHandler(server, null, err => {
            expect(err).to.be.equal(error);
            done();
        });
        server.emit('clientError', error, socet);
    });

    it('it should test error event without syscall', done => {
        const error = new Error('test');
        error.code = 'test';
        server.address = () => ({ port: 3000});
        serverHandler(server, null, err => {
            expect(err).to.be.equal(error);
            done();
        });
        server.emit('error', error);
    });

    it('it should test error event', done => {
        const error = new Error('test');
        error.syscall = 'listen';
        error.code = 'test';
        server.address = () => ({ port: 3000});
        serverHandler(server, null, err => {
            expect(err).to.be.equal(error);
            done();
        });
        server.emit('error', error);
    });

    it('it should test error event with code: EACCES', done => {
        const error = new Error('test');
        error.syscall = 'listen';
        error.code = 'EACCES';
        server.address = () => ({ port: 3000});
        serverHandler(server, null, err => {
            expect(err).to.be.equal(error);
            done();
        });
        server.emit('error', error);
    });

    it('it should test error event with code: EADDRINUSE', done => {
        const error = new Error('test');
        error.syscall = 'listen';
        error.code = 'EADDRINUSE';
        server.address = () => ({ port: 3000});
        serverHandler(server, null, err => {
            expect(err).to.be.equal(error);
            done();
        });
        server.emit('error', error);
    });
    
});