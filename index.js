const express = require('express');
const app = express();
const port = 3000;
const db = require('./src/config/db.connect');
const route = require('./src/routes');
db.connect();
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
