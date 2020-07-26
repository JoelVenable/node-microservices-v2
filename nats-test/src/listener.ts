import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();
const client = nats.connect('ticketing-app', randomBytes(3).toString('hex'), {
    url: 'http://localhost:4222'
})


client.on('connect', () => {
    console.log('Listener Connected to NATS')

    client.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    })

    const options = client
        .subscriptionOptions()
        .setManualAckMode(true)

    const subscription = client.subscribe(
        'ticket:created',
        'ListenerQG',
        options
    );

    subscription.on('message', (msg: Message) => {
        const data = msg.getData()
        const seq = msg.getSequence()
        if (typeof data === 'string') {
            console.log(`Received event #${seq} with data: ${data}`)

        }

        msg.ack()
    })
})



process.on('SIGINT', client.close)
process.on('SIGTERM', client.close)
