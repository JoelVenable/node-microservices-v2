import { Topics } from "./Topics";
import { BaseEvent } from "./BaseEvent";


export interface TicketCreatedData {
    id: string
    title: string
    price: number
    version: number
}


export interface TicketCreatedEvent extends BaseEvent {
    subject: Topics.TicketCreated
    data: TicketCreatedData
}