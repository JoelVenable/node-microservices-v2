
// const start = async () => {
//     const pub = new TicketCreatedPublisher(client)
//     await pub.init()
//     const data = {
//         id: '3ojwadflsdkj',
//         title: 'concert',
//         price: 20,
//         userId: '123sdfas',
//         version: 1
//     }

//     const guid = await pub.publish(data)

// }


// start()


import { Stan, Message, connect, StanOptions } from "node-nats-streaming";
import { BaseEvent } from "./BaseEvent";



export interface NatsClientProps extends StanOptions {
    serviceName?: string
    uniqueId: string
    serverUrl?: string
}



export class NatsClient {

    readonly client: Stan

    readonly connect: Promise<this>



    constructor({
        uniqueId,
        serviceName = 'ticketing-app',
        serverUrl = 'http://localhost:4222',
        ackTimeout = 5 * 1000, // 5 seconds
        url,
        ...rest
    }: NatsClientProps) {


        this.client = connect(serviceName, uniqueId, {
            url: serverUrl,
            ...rest
        })

        this.connect = this.init()



        this.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        })
        process.on('SIGINT', this.client.close)
        process.on('SIGTERM', this.client.close)
    }


    private async init(): Promise<this> {

        return new Promise<this>((res) => {
            this.client.on('connect', () => {
                console.log(`Connected to NATS`)
                res(this)
            })
        })

    }
}