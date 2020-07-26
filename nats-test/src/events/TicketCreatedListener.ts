import { Listener, MessageResponse } from "./BaseListener";
import { Topics } from "./Topics";
import { TicketCreatedEvent, TicketCreatedData } from "./TicketCreatedEvent";










export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly topic = Topics.TicketCreated;
    readonly queueGroupName = 'TicketService'


    onMessage({ data }: MessageResponse<TicketCreatedData>) {
        console.log('Event data', data)
    }
}