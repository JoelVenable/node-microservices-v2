import { Stan, connect } from 'node-nats-streaming';
import { BaseEvent } from './BaseEvent';


export abstract class Publisher<T extends BaseEvent> {
    abstract topic: T["subject"]

    private client: Stan

    constructor(client: Stan) {
        this.client = client

        this.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        })
        process.on('SIGINT', client.close)
        process.on('SIGTERM', client.close)
    }

    async init() {
        await new Promise((res) => {
            this.client.on('connect', async () => {
                console.log('Publisher Connected to NATS')
                res()
            })
        })
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