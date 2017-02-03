const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const Koa = require('koa');
const http = require('http');
const router = require('koa-router')();
const middleware = require('./../index').error;
chai.use(chaiHttp);
let app;

describe('Error handler', () => {

    beforeEach( async () => {
        app = new Koa();
        return true;
    });

    it('it should test middleware', async () => {

        app.use(middleware());
        router.get('/', cnt => {
            cnt.body = { message: 'Ok'};
        });
        app.use(router.routes());
        app.use(router.allowedMethods());
        return chai.request(http.createServer(app.callback()))
            .get('/')
            .send()
            .then(res => expect(res).to.have.status(200));
    });

    it('it should test middleware with 404 error', async () => {
        app.use(middleware());
        return chai.request(http.createServer(app.callback()))
            .get('/')
            .send()
            .catch(err => expect(err.status).to.be.equal(404));
    });

    it('it should test middleware with error', async () => {
        app.use(middleware());
        app.use(async () => {
            throw new Error('test');
        });
        return chai.request(http.createServer(app.callback()))
            .get('/')
            .send()
            .catch(err => expect(err.status).to.be.equal(500));
    });

    it('it should test middleware with error and callback', async () => {
        app.use(middleware((err, ctx) => {
            expect(err).is.not.undefined;
            expect(ctx).is.not.undefined;
        }));
        app.use(async () => {
            throw new Error('test');
        });
        return chai.request(http.createServer(app.callback()))
            .get('/')
            .send()
            .catch(err => expect(err.status).to.be.equal(500));
    });
});