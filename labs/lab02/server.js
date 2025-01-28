const express = require('express');
const app = express();
const routes = require('./routes'); // Importing routes file

app.use('/', routes); // Using routes

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
