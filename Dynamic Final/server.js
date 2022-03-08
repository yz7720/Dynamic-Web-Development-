// Express is a node module for building HTTP servers
var express = require("express");
var app = express();

// Tell Express to look in the "public" folder for any files first
app.use(express.static("public"));

// If the user just goes to the "route" / then run this function
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/shawn", function(req, res) {
  res.send("Hey!");
});

// Here is the actual HTTP server
var http = require("http");
// We pass in the Express object
var httpServer = http.createServer(app);
// Listen on port provided by Glitch
httpServer.listen(process.env.PORT);

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require("socket.io")(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log(socket.id + " has joined the chat.");
    
    socket.on("mouse", function(data) {
      //io.emit("mouse", data);
      socket.broadcast.emit("mouse", data);
    });

    socket.on("disconnect", function () {
      console.log(socket.id + " has disconnected.");
    });
  }
);
