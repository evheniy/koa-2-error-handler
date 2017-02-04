const debug = require('debug')('error:handler');
const httpStatus = require('http-status-codes');

module.exports = callback => async (ctx, next) => {
    try {
        await next();
        return ctx.response.status === httpStatus.NOT_FOUND ? ctx.throw(httpStatus.NOT_FOUND) : true;
    } catch (err) {
        debug(err);
        ctx.status = err.statusCode || err.status || httpStatus.INTERNAL_SERVER_ERROR;
        if (callback) {
            callback(err, ctx);
        } else {
            ctx.body = {
                message: err.message
            };
        }
    }
};