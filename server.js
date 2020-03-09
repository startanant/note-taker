//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

//app setup
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get("/api/notes", (req, res) => {
    let readNotes = fs.readFileSync("./db/db.json", "utf-8");
    notes = JSON.parse(readNotes);
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    let note = req.body;
    let readNotes = fs.readFileSync("./db/db.json", "utf-8");
    let notes = JSON.parse(readNotes);
    notes.push(note);
    let writeNotes = JSON.stringify(notes);
    fs.writeFileSync("./db/db.json", writeNotes);
    res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    let readNotes = fs.readFileSync("./db/db.json", "utf-8");
    let notes = JSON.parse(readNotes);
    let deleteNote = notes.filter( (note) => note.id != noteId );
    let writeNotes = JSON.stringify(deleteNote);
    fs.writeFileSync("./db/db.json", writeNotes);
    res.json(notes);
});


