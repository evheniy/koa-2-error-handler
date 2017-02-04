const debug = require('debug')('error:normalizePort');

module.exports = (val, message = 'Port should be numeric value!') => {
    debug(val);
    const port = parseInt(val, 10);
    if (port && port > 0) {
        return port;
    } else {
        throw new Error(message);
    }
};