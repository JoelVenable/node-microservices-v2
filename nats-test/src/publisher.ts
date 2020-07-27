import nats from 'node-nats-streaming';
import { Publisher, Ticket, Topics } from '@jdvtickets/common'

class TicketCreatedPublisher extends Publisher<Ticket.TicketCreatedEvent> {
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
        userId: '123sdfas',
        version: 1
    }

    const guid = await pub.publish(data)

}


start()
