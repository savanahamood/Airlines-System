'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const io = require('socket.io-client');
let host = `http://localhost:${port}/airline`;
const AirLineConnection = io.connect(host);


 
  AirLineConnection.on('took-off-log', (flightID) => {
        console.log(`Pilot: Flight with ID '${flightID}' took off.`);
      })
   

    
    AirLineConnection.on('arrived-log', (flightID) => {
        console.log(`Pilot: Flight with ID '${flightID}' arrived.`);
      })
      

