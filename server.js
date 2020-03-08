//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

//app setup
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Application running on http://localhost:${PORT}`);
});

//routes
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});


