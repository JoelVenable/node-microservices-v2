import { v4 as uuid } from 'uuid'

class MockNatsClient {

    private _client = {
        publish: jest.fn().mockImplementation(
            (subject: string, data: string, callback: (err: Error | undefined, id: string) => void) => {
                const id = uuid()
                callback(undefined, id)
            })
    }



    async connect(): Promise<void> {
        // return this._client
    }

    getClient() {
        return this._client
    }
}

export const natsClient = new MockNatsClient()