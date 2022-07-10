const express = require("express");
const path = require("path");
require("dotenv").config();

// Create a new express application instance
const app = express();

// Node server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Public path
const publicPath = path.join(__dirname, "public");

// use publicpath to serve static files
app.use(express.static(publicPath));
// Cors middleware
app.use(cors());

server.listen(process.env.PORT, (error) => {
  if (error) console.error(error);

  console.log(`Server is running on port ${process.env.PORT}`);
});
