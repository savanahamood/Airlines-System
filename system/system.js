"use strict";

require("dotenv").config();
const port = process.env.PORT || 3030;
const socket = require("socket.io");
const ioServer = socket(port);
const uuid = require('uuid').v4;
const queue = {
  flights: {

  }
}

ioServer.on("connection", (newSocket) => {
  console.log(`connected ${newSocket.id}`);

  newSocket.on("new-flight", (payload) => {
    console.log("Flight ", payload);
    ioServer.emit("flight-pilot-status",payload);

    const id = uuid();
    queue.flights[id] = payload;
    newSocket.emit('added-new-flight', payload);
    ioServer.emit('new-flight-msg', {
      id: id,
      Details: queue.flights[id]
    })
  });

  newSocket.on("Arrived", (payload) => {
    ioServer.emit('thanku',payload);
  });


  newSocket.on('get-all', () => {
    Object.keys(queue.flights).forEach((id) => {
      newSocket.emit('new-flight-msg', {
        id: id,
        Details: queue.flights[id]
      })
    })
  })


  newSocket.on('received', (payload) => {
    console.log('msgQueue v1', payload.Details)
    delete queue.flights[payload.id];
    console.log('msgQueue v2', queue.flights)

  })


});

const airline = ioServer.of('/airline');

airline.on('connection', (newSocket) => {
    console.log(`connected with airline ${newSocket.id}`);
    newSocket.on("took-off", (payload) => {
    });
    
})
