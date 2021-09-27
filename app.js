#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./express-app');
const cluster = require('cluster');
const config = require('./config/config');
const logger = require('./config/logger');

/**
 * Handle clusters configuration
 */
var workers = {};
var count = 1;
if(config.env === 'production') {
  count = require('os').cpus().length;
}
/**
 * Establish Connections
 */

const db = require('./config/db');
const firebase = require('./config/firebase');

/**
 * Create HTTP server.
 */
if (cluster.isMaster) {
  for (var i = 0; i < count; i++) {
    spawn();
  }
  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died. spawning a new process...');
    delete workers[worker.pid];
    spawn();
  });
} else {
  let server = app.listen(config.port);
  server.on('error', onError);
  server.on('listening', onListening);
}


/**
 * Workers creation funciton
 */
function spawn() {
  var worker = cluster.fork();
  workers[worker.pid] = worker;
  return worker;
}

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
    : 'Port ' + port;

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
