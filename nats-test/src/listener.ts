import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();
const stan = nats.connect('ticketing-app', randomBytes(3).toString('hex'), {
    url: 'http://localhost:4222'
})


stan.on('connect', () => {
    console.log('Listener Connected to NATS')

    new TicketCreatedListener(stan).listen()

    stan.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    })

    //     const options = client
    //         .subscriptionOptions()
    //         .setManualAckMode(true)
    //         .setDeliverAllAvailable()
    //         .setDurableName('Listener');


    //     const subscription = client.subscribe(
    //         'ticket:created',
    //         'ListenerQG',
    //         options
    //     );

    //     subscription.on('message', (msg: Message) => {
    //         const data = msg.getData()
    //         const seq = msg.getSequence()
    //         if (typeof data === 'string') {
    //             console.log(`Received event #${seq} with data: ${data}`)

    //         }

    //         msg.ack()
    //     })
})

process.on('SIGINT', stan.close)
process.on('SIGTERM', stan.close)


export interface MessageResponse<T extends Record<string, any>> {
    data: T
    msg: Message
}


export interface ListenerProps {
    ackWait?: number
    uniqueId: string
    topic: string
    queueGroupName: string

}



abstract class Listener {
    abstract topic: string

    abstract queueGroupName: string

    protected ackWait: number = 5 * 1000; //  5 seconds

    private client: Stan;

    constructor(client: Stan) {
        this.client = client
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
    }

    listen<T = {}>() {
        const subscription = this.client.subscribe(
            this.topic,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg: Message) => {
            console.log('Received Message:')
            const { topic, queueGroupName } = this;

            const data = this.parseMessage(msg) as T;

            console.log(JSON.stringify({ topic, queueGroupName, data }, undefined, 3))
            try {
                this.onMessage<T>({ data, msg })
                msg.ack();
            } catch (err) {
                console.log(err)
            }
        })
    }


    abstract onMessage<T = {}>(vars: MessageResponse<T>): any



    protected parseMessage(msg: Message) {
        const data = msg.getData()

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'))
    }

}


interface TicketData {
    id: string
    title: string
    price: number
    version: number
}

class TicketCreatedListener extends Listener {
    topic = 'ticket:created';
    queueGroupName = 'TicketService'


    onMessage<TicketData>({ data }: MessageResponse<TicketData>) {
        console.log('Event data', data)
    }
}