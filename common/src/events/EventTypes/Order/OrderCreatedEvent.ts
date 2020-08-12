import { Topics } from "../../Topics";
import { BaseEvent } from "../../Base/BaseEvent";


export interface OrderCreatedData {
    id: string
    title: string
    price: number
    userId: string
    version: number
}


export interface OrderCreatedEvent extends BaseEvent {
    subject: Topics.OrderCreated
    data: OrderCreatedData
}