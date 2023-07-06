'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
require('./pilot')
require('./system')
const events = require('./events');

setInterval(() => {
    const flightId = uuidv4();
    const destination = faker.location.city();
    const pilotName = faker.person.firstName();

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

    console.log(`Manager: new flight with ID ${flightId} has been scheduled`);
    events.emit('new-flight', flightDetails);
}, 10000);

events.on('arrived', (flightDetails) => {
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${flightDetails.Details.pilot}`);
});