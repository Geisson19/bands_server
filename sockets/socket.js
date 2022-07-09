const { io } = require("../index");

io.on("connection", (client) => {
  console.log("New client connected");
  client.on("event", (event) => {
    console.log(event);
  });
  client.on("disconnect", () => {
    console.log("disconnected");
  });
  client.on("message", (message) => {
    console.log(message);
    io.emit("message", { admin: "Admin hi" });
  });

  client.on("emitir", (payload) => {
    io.emit("message", payload);
  });
});
