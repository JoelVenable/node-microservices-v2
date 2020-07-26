import nats from 'node-nats-streaming';


const client = nats.connect('ticketing-app', 'abc', {
    url: 'http://localhost:4222'
})


client.on('connect', () => {
    console.log('Publisher Connected to NATS')
})



