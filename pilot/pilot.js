"use strict";

require("dotenv").config();
const port = process.env.PORT || 3030;
const io = require("socket.io-client");
const host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);

const airlineHost = `http://localhost:${port}/airline`;
const airlineConnection = io.connect(airlineHost);

systemConnection.on("flight-pilot-status", newFlight);

systemConnection.emit("get-all");

systemConnection.on("new-flight-msg", (payload) => {
  console.log("Pilot:Sorry i didnt catch this flight ID", payload.id,payload.Details);
  console.log("i got it.");
  systemConnection.emit("received", payload);
});

function newFlight(payload) {
  setTimeout(() => {
    payload.event = "took-off";
    airlineConnection.emit("took-off", payload);
  }, 4000);

  setTimeout(() => {
    payload.event = "Arrived";
    systemConnection.emit("Arrived", payload);
  }, 7000);
}