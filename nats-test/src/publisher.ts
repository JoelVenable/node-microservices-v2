import nats from 'node-nats-streaming';

console.clear();
const client = nats.connect('ticketing-app', 'abc', {
    url: 'http://localhost:4222'
})


client.on('connect', () => {
    console.log('Publisher Connected to NATS')

    const data = JSON.stringify({
        id: '3ojwadflsdkj',
        title: 'concert',
        price: 20
    })

    client.publish('ticket:created', data, () => {
        console.log('Event published')
    })
})



