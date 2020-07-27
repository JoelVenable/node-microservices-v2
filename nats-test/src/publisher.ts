import nats from 'node-nats-streaming';
import { Publisher } from './events/BasePublisher'
import { TicketCreatedEvent } from './events/TicketCreatedEvent';
import { Topics } from './events/Topics';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly topic = Topics.TicketCreated;

}

console.clear();
const client = nats.connect('ticketing-app', 'abc', {
    url: 'http://localhost:4222'
})

const start = async () => {
    const pub = new TicketCreatedPublisher(client)
    await pub.init()
    const data = {
        id: '3ojwadflsdkj',
        title: 'concert',
        price: 20,
        version: 1
    }

    const guid = await pub.publish(data)

}


start()
