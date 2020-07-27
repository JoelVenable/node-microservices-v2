import { Publisher, Ticket, Topics } from '@jdvtickets/common'

export class TicketCreatedPublisher extends Publisher<Ticket.TicketCreatedEvent> {
    readonly topic = Topics.TicketCreated;

}

