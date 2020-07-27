import { Topics } from "../Topics";



export interface BaseEvent {
    subject: Topics
    data: any
}