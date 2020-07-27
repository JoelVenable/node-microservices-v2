import { Stan, Message } from "node-nats-streaming";
import { BaseEvent } from "./BaseEvent";

export interface MessageResponse<T extends Record<string, any>> {
    data: T
    msg: Message
}

export abstract class Listener<T extends BaseEvent> {
    abstract readonly topic: T['subject']

    abstract readonly queueGroupName: string

    protected ackWait: number = 5 * 1000; //  5 seconds

    private readonly client: Stan;

    readonly connect: Promise<this>

    constructor(client: Stan) {
        this.client = client
        this.connect = this.init()
    }



    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
    }

    private async init(): Promise<this> {

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

        return this
    }


    abstract onMessage(data: MessageResponse<T['data']>): void | Promise<void>



    protected parseMessage(msg: Message) {
        const data = msg.getData()

        return JSON.parse(
            typeof data === 'string'
                ? data
                : data.toString('utf-8')
        )
    }

}