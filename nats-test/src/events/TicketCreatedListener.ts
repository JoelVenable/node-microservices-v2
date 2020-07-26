import { Listener, MessageResponse } from "./BaseListener";
import { Topics } from "./Topics";
import { TicketCreatedEvent } from "./TicketCreatedEvent";










export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    topic: Topics.TicketCreated = Topics.TicketCreated;
    queueGroupName = 'TicketService'


    onMessage<TicketCreatedData>({ data }: MessageResponse<TicketCreatedData>) {
        console.log('Event data', data)
    }
}