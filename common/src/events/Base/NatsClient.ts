
import { Stan, connect, StanOptions } from "node-nats-streaming";



export interface NatsClientProps extends StanOptions {
    serviceName?: string
    uniqueId: string
    serverUrl?: string
}



class NatsClient {

    private _client?: Stan



    async connect({
        uniqueId,
        serviceName = 'ticketing-app',
        serverUrl = 'http://localhost:4222',
        ackTimeout = 5 * 1000, // 5 seconds
        url,
        ...rest
    }: NatsClientProps): Promise<Stan> {
        this._client = connect(serviceName, uniqueId, {
            url: serverUrl,
            ...rest
        })

        await this.init()


        this._client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        })

        process.on('SIGINT', this._client.close)
        process.on('SIGTERM', this._client.close)

        return this._client
    }

    getClient(): Stan {
        if (!this._client) throw new Error('Client undefined.  Try running connect() firt!')
        return this._client
    }

    private async init(): Promise<this> {
        return new Promise<this>((res, rej) => {
            if (!this._client) throw new Error('Client undefined')
            this._client.on('connect', () => {
                console.log(`Connected to NATS`)
                res(this)
            })
            this._client.on('error', rej)
        })
    }
}

export const natsClient = new NatsClient()