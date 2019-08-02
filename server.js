const express = require('express');
const config = require('./config');
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname, 'public')));

server.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

server.listen(config.PORT, () => {
    console.log('Server listen on port: %s', config.PORT);
})