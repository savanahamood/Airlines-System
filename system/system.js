'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const socket = require('socket.io');
const ioServer = socket(port);
const AirLineConnection = ioServer.of('/airline');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');


ioServer.on('connection', (socket) => {
    console.log('connected ', socket.id);

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
    socket.on('new-flight', (flightDetails) => {

        console.log('Flight', flightDetails);
        socket.emit('new-flight', flightDetails);

        setTimeout(() => {
            flightDetails.event='took-off'
            AirLineConnection.emit('took-off', flightDetails);
            console.log('Flight', flightDetails);
            AirLineConnection.emit('took-off-log', flightDetails.Details.flightID);
        }, 4000);

        setTimeout(() => {
            flightDetails.event='Arrived'

            socket.emit('Arrived', flightDetails);
            console.log('Flight', flightDetails);
            AirLineConnection.emit('arrived-log', flightDetails.Details.flightID);
        }, 7000);

    });

})
