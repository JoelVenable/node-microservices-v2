import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/TicketCreatedListener';

console.clear();
const stan = nats.connect('ticketing-app', randomBytes(3).toString('hex'), {
    url: 'http://localhost:4222'
})


stan.on('connect', () => {
    console.log('Listener Connected to NATS')

    new TicketCreatedListener(stan).listen()

    stan.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    })

    //     const options = client
    //         .subscriptionOptions()
    //         .setManualAckMode(true)
    //         .setDeliverAllAvailable()
    //         .setDurableName('Listener');


    //     const subscription = client.subscribe(
    //         'ticket:created',
    //         'ListenerQG',
    //         options
    //     );

    //     subscription.on('message', (msg: Message) => {
    //         const data = msg.getData()
    //         const seq = msg.getSequence()
    //         if (typeof data === 'string') {
    //             console.log(`Received event #${seq} with data: ${data}`)

    //         }

    //         msg.ack()
    //     })
})

process.on('SIGINT', stan.close)
process.on('SIGTERM', stan.close)








