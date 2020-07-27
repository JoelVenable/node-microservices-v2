import { Topics } from "../../Topics";
import { BaseEvent } from "../../Base/BaseEvent";


export interface TicketUpdatedData {
    id: string
    title: string
    price: number
    userId: string
    version: number
}


export interface TicketUpdatedEvent extends BaseEvent {
    subject: Topics.TicketUpdated
    data: TicketUpdatedData
}