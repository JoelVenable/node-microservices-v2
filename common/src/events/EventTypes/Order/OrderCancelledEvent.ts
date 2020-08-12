import { Topics } from "../../Topics";
import { BaseEvent } from "../../Base/BaseEvent";


export interface OrderCancelledData {
    id: string
    title: string
    price: number
    userId: string
    version: number
}


export interface OrderCancelledEvent extends BaseEvent {
    subject: Topics.OrderCancelled
    data: OrderCancelledData
}