'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const registerRoutes = require('./routes');

// server config
const port = process.env.PORT || 3000;
app.use(cors());
// register routes
registerRoutes(app);

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve();
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`);
    });
};

module.exports = start;


