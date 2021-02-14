// server.js
// where your node app starts

// init project
var express = require('express');
// setup a new database
// persisted using async file storage
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)
var app = express();

// default user list
db.defaults({ rituals: [
      {"act":"John", "result":"Hancock"},
      {"act":"Liz",  "result":"Smith"},
      {"act":"Ahmed","result":"Khan"}
    ]
  }).write();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/rituals", function (request, response) {
  var dbUsers=[];
  var users = db.get('rituals').value() // Find all users in the collection
  users.forEach(function(ritual) {
    dbUsers.push([ritual.act,ritual.result]); // adds their info to the dbUsers value
  });
  response.send(dbUsers); // sends dbUsers back to the page
});

// creates a new entry in the users collection with the submitted values
app.post("/rituals", function (request, response) {
  db.get('rituals')
    .push({ act: request.query.act, result: request.query.result })
    .write()
  console.log("New ritual\n");
  response.sendStatus(200);
});

// removes entries from users and populates it with default users
app.get("/reset", function (request, response) {
  // removes all entries from the collection
  db.get('rituals')
  .remove()
  .write()
  console.log("Database cleared");
  
  // default users inserted in the database
  var rituals= [
      {"act":"John", "result":"Hancock"},
      {"act":"Liz",  "result":"Smith"},
      {"act":"Ahmed","result":"Khan"}
  ];
  
  rituals.forEach(function(ritual){
    db.get('rituals')
      .push({ act: ritual.act, result: ritual.result })
      .write()
  });
  console.log("Default users added");
  response.redirect("/");
});

// removes all entries from the collection
app.get("/clear", function (request, response) {
  // removes all entries from the collection
  db.get('rituals')
  .remove()
  .write()
  console.log("Database cleared");
  response.redirect("/");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});