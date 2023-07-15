"use strict";

require('dotenv').config();
const port = process.env.PORT || 3030;
const io = require('socket.io-client');
const host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);


const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');


setInterval(() => {
  const flightId = uuidv4();
  const pilotName = faker.person.fullName();
  const destination = faker.location.city();

  const flightDetails = {
    event: "new-flight",
    time: faker.date.future(),
    Details: {
      airLine: 'Royal Jordanian Airlines',
      pilotName: pilotName,
      flightID: flightId,
      destination: destination,
    } 
  }

  console.log(`Manager: New Flight with ID: '${flightId}' have been scheduled`);

  systemConnection.emit("new-flight", flightDetails);

}, 10000);

systemConnection.on('added-new-flight', (payload) => {
  console.log(`Manager: The new flight is added ${payload.Details.flightID}`)
})

systemConnection.on('thanku', (payload) => {
  console.log(`Manager: we're greatly thankful for the amazing flight, ${payload.Details.pilotName}`)
});