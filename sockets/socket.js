const { io } = require("../index");
const Band = require("../models/band");

const Bands = require("../models/bands");
const bands = new Bands();

bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("AC/DC"));
bands.addBand(new Band("Iron Maiden"));

io.on("connection", (client) => {
  console.log("New client connected");

  client.emit("bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("disconnected");
  });
  client.on("message", (message) => {
    console.log(message);
    io.emit("message", { admin: "Admin hi" });
  });

  client.on("emitir", (payload) => {
    client.broadcast.emit("message", payload); // Emite a todos menos a él mismo
  });

  // Votar
  client.on("vote-band", ({ id }) => {
    bands.voteBand(id);
    io.emit("bands", bands.getBands());
  });
});
