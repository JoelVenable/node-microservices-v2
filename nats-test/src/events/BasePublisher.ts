import { Stan, connect } from 'node-nats-streaming';
import { BaseEvent } from './BaseEvent';



export abstract class Publisher<T extends BaseEvent> {
    abstract topic: T["subject"]

    private client: Stan

    constructor(client: Stan) {
        this.client = client
    }

    async publish(data: T['data']): Promise<string> {
        return new Promise<string>((res, rej) => {
            this.client.publish(this.topic, JSON.stringify(data), (err, guid) => {
                if (err) rej(err);
                else {
                    console.log(`Event published: ${guid}`);
                    res(guid)
                }
            })
        })
    }
}