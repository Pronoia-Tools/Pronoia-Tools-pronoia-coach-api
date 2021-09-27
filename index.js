#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

/**
 * Establish Connections
 */

const db = require('./config/db');
const firebase = require('./config/firebase');

/**
 * Create HTTP server.
 */
let server = app.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  logger.info(`Listening to port ${config.port}`);
}

/**
 * Event listener for HTTP server "error" event.
 */

 function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'PORT ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
