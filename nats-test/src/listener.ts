import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/TicketCreatedListener';

console.clear();
const stan = nats.connect('ticketing-app', randomBytes(3).toString('hex'), {
    url: 'http://localhost:4222'
})

const start = async () => {
    const listener = new TicketCreatedListener(stan)
    await listener.init().catch(console.error)
}

start()


