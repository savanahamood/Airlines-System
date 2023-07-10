
'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const io = require('socket.io-client');
let host = `http://localhost:${port}/`;
const SystemConnection = io.connect(host);
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

function scheduleNewFlight() {
  const flightId = uuidv4();
  const pilotName = faker.person.firstName();
  const destination = faker.location.city();

  const flightDetails = {
    event: 'new-flight',
    time: new Date(),
    Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: flightId,
        pilot: pilotName,
        destination: destination,
    },
};
  SystemConnection.emit('new-flight', flightDetails);

}

function handleNewFlight(flightDetails) {
  console.log(`Manager: new flight with ID '${flightDetails.Details.flightID}' has been scheduled`);
  console.log(`Manager: we're greatly thankful for the amazing flight, ${flightDetails.Details.pilot}`);
}



setInterval(scheduleNewFlight, 10000);
SystemConnection.on('new-flight', handleNewFlight);

