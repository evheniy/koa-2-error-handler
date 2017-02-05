Koa.js 2 error handler
======================


[![Build Status](https://travis-ci.org/evheniy/koa-2-error-handler.svg?branch=master)](https://travis-ci.org/evheniy/koa-2-error-handler)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/koa-2-error-handler/badge.svg?branch=master)](https://coveralls.io/github/evheniy/koa-2-error-handler?branch=master)


Description
-----------

Error handler for Koa 2 application.


Installation
------------

    npm i -S koa-2-error-handler
    
Documentation
-------------

### Error handle middleware

Error handle middleware should be the first app.use middleware

    const Koa = require('koa');
    const app = new Koa();
    const error = require('koa-2-error-handler').error;
    app.use(error());
    
Or we can update response error message:

    app.use(error((err, ctx) => {
        ctx.body = {
            message: err.message
        };
        logger.error(err);
    }));


### Server event listeners

We can use node.js http server and process server events:

app.js:

    const Koa = require('koa');
    const app = module.exports = new Koa();
    
bin/www

    #!/usr/bin/env node
    
    /**
     * Module dependencies.
     */
    const http = require('http');
    const errorHandler = require('koa-2-error-handler');
    const app = require('../app');
    
    /**
     * Create HTTP server.
     */
    const server = http.createServer(app.callback());
    
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(errorHandler.helper(process.env.PORT || '3000'));
    
    /**
     * Handling  listening and error events
     */
    errorHandler.server(server, console.info, console.error);
    
package.json:

    "scripts": {
        "start": "node --harmony ./bin/www",
        ...
    }
    
Packages
--------

### Modules:
* [http-status-codes](https://www.npmjs.com/package/http-status-codes)


### Testing:
* [mocha](https://mochajs.org/)
* [chai](http://chaijs.com/)
* [sinon](http://sinonjs.org/)
* [eslint](http://eslint.org/)
* [istanbul](https://www.npmjs.com/package/istanbul)
* [nsp](https://www.npmjs.com/package/nsp)