import nats, { Message } from 'node-nats-streaming';

console.clear();
const client = nats.connect('ticketing-app', '123', {
    url: 'http://localhost:4222'
})


client.on('connect', () => {
    console.log('Listener Connected to NATS')

    const subscription = client.subscribe('ticket:created');

    subscription.on('message', (msg: Message) => {
        const data = msg.getData()
        const seq = msg.getSequence()
        if (typeof data === 'string') {
            console.log(`Received event #${seq} with data: ${data}`)

        }
    })
})



