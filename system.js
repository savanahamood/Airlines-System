'use strict';
const events = require('./events');
require('./manager')
require('./pilot')


events.on('new-flight', (payload) => {
    
    console.log('Flight', payload);
   // console.log('**************************************************************')
});

events.on('took-off', (payload) => {
    
    console.log('Flight', payload);
    //console.log('**************************************************************')
});

events.on('arrived', (payload) => {
    
    console.log('Flight', payload);
    //console.log('**************************************************************')
});