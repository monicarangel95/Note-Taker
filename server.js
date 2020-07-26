//=====================
// DEPENDENCIES
//=====================
//Series of npm packages that will give our server functionality//
var express = require("express");
const fs = require("fs");
var path = require("path");
//=====================
// EXPRESS CONFIGURATION
//=====================
// This sets up the basic properties for our express server
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Serve a public folder
app.use(express.static("public"));

//Load the note list from file
let noteList = parseNotes()

//A function to read/write db.JSON note file
function parseNotes(){
    const noteList = JSON.parse( fs.readFileSync( './db/db.json',  'utf8') )
    return noteList
}
function saveNotes() {
    fs.writeFileSync( '/db/db.json', JSON.stringify(noteList))
}

// ======================
// HTML ROUTER
// ======================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
// ========================
// API ROUTES
//=========================
// Get All notes
app.get('/api/notes', function(req, res) {
    // console.log('get notes')
    res.send( noteList )
})

// ADD NOTE
app.post('/api/notes', function(req, res) {
    let newNote = req.body
    // Creates a new note ID
    newNote.id = Date.now()
    noteList.push(newNote)
    saveNotes()
    res.send( newNote )
})

// DELETE NOTE
app.delete( '/api/notes/:id', function( req, res ){
    const num = req.params.id
    noteList = noteList.filter( note=>note.id != num )
    saveNotes()
    res.send( { id: num, message: 'Note Removed', status: true } )
})

// ======================
// LISTENER
// The below code effectively "starts" our server
// ======================

app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
});