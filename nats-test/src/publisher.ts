import { Publisher, Ticket, Topics, natsClient } from '@jdvtickets/common'
import { randomBytes } from 'crypto';

class TicketCreatedPublisher extends Publisher<Ticket.TicketCreatedEvent> {
    readonly topic = Topics.TicketCreated;

}

console.clear();

const start = async () => {
    const client = await natsClient.connect({
        uniqueId: randomBytes(4).toString('hex')
    })
    const pub = new TicketCreatedPublisher(client)
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
