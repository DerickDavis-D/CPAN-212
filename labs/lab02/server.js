const express = require('express');
const app = express();
const path = require('path'); 

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});


const routes = require('./routes'); // Importing routes file

app.use('/', routes); // Using routes

app.use(cors({ origin: 'http://localhost:3003' }));

// Serve static files
app.use(express.static('html'));


const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
    