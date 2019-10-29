/*
|--------------------------------------------------------------------------
| The `I` in API
|--------------------------------------------------------------------------
| 1. Setup configs and environment variables
| 2. Setup servers
| 3. Setup Middlewares
|--------------------------------------------------------------------------
*/

const express = require('express');

const app = express();

app.use('/'    , require('./routes/DefaultRoute'));

app.listen(80, () => {
    console.log("\nListening on \x1b[35m%s\x1b[0m:", "http://localhost");
});