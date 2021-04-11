'use strict';

const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../src/dist')));

app.get(/.*$/, (request, response) => {
    response.sendFile(path.join(__dirname, '../src/dist/index.html'));
});

app.listen(3000);
