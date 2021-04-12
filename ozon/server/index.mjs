'use strict';

import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'ozon/src/dist')));

app.get(/.*$/, (request, response) => {
    response.sendFile(path.join(__dirname, 'ozon/src/dist/index.html'));
});

app.listen(3000);
