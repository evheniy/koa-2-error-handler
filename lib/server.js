/*eslint no-console: 0*/
const debug = require('debug')('error:server');

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (serverAddress, callback) => {
    debug(serverAddress);
    callback(serverAddress);
    debug(`Listening on ${serverAddress}`);
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error, serverAddress, callback) => {
    debug(error);
    callback(error);

    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${serverAddress} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${serverAddress} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "clientError" event.
 */
const clientError = (error, socket, callback) => {
    debug(error);
    callback(error);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
};

module.exports = (server, infoCallback, errorCallback) => {
    const address = server.address();
    const serverAddress = typeof address === 'string'
        ? `pipe ${address}`
        : `port ${address.port}`;

    server.on('listening', () => onListening(serverAddress, infoCallback));
    server.on('error', error => onError(error, serverAddress, errorCallback));
    server.on('clientError', (error, socket) => clientError(error, socket, errorCallback));
};