'use strict';
const Hapi = require('hapi');
const fs = require('fs');
const logger = require('./config/logger');
const config = require('./config/config.json');
const routers = require('./app/routers');

const tls = {
    key: fs.readFileSync('./ssl/key.txt'),
    cert: fs.readFileSync('./ssl/crt.txt')
};

const server = Hapi.server({
    host: config['app']['host'],
    port: config['app']['port'],
    tls: tls
});

server.route(routers);

const init = async () => {
    await server.start();
    logger.info(`Server running at: ${server.info.uri}`);
    console.log(`Server running at: ${server.info.uri}`);
};
process.on('unhandledRejection', (err) => {
    logger.error(err.toString())
    process.exit(1);
});


init();