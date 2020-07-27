import { Topics } from "../../Topics";
import { BaseEvent } from "../../Base/BaseEvent";


export interface TicketCreatedData {
    id: string
    title: string
    price: number
    userId: string
    version: number
}


export interface TicketCreatedEvent extends BaseEvent {
    subject: Topics.TicketCreated
    data: TicketCreatedData
}