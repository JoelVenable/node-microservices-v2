import { Publisher, Ticket, Topics } from '@jdvtickets/common'

export class TicketUpdatedPublisher extends Publisher<Ticket.TicketUpdatedEvent> {
    readonly topic = Topics.TicketUpdated;

}

