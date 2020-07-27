import { Listener, MessageResponse, Topics, Ticket } from "@jdvtickets/common";







export class TicketCreatedListener extends Listener<Ticket.TicketCreatedEvent> {
    readonly topic = Topics.TicketCreated;
    readonly queueGroupName = 'TicketService'


    onMessage({ data }: MessageResponse<Ticket.TicketCreatedData>) {
        console.log('Event data', data)
    }
}