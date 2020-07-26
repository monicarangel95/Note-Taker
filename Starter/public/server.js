//=====================
// DEPENDENCIES
//=====================
//Series of npm packages that will give our server functionality//
var express = require("express");
//=====================
// EXPRESS CONFIGURATION
//=====================
// This sets up the basic properties for our express server
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

// ======================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ======================