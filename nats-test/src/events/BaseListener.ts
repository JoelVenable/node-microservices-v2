import { Stan, Message } from "node-nats-streaming";
import { Topics } from "./Topics";
import { BaseEvent } from "./BaseEvent";

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


export abstract class Listener<T extends BaseEvent> {
    abstract readonly topic: T['subject']

    abstract readonly queueGroupName: string

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

    listen() {
        const subscription = this.client.subscribe(
            this.topic,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', async (msg: Message) => {
            console.log('Received Message:')
            const { topic, queueGroupName } = this;
            const sequence = msg.getSequence()

            const data = this.parseMessage(msg);

            console.log(JSON.stringify({ topic, sequence, queueGroupName, data }, undefined, 3))
            try {
                await this.onMessage({ data, msg })
                msg.ack();
            } catch (err) {
                console.log(err)
            }
        })
    }


    abstract onMessage(data: MessageResponse<T['data']>): void | Promise<void>



    protected parseMessage(msg: Message) {
        const data = msg.getData()

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'))
    }

}