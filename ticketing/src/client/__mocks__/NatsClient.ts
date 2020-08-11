

class MockNatsClient {

    // private _client?: Stan



    async connect(): Promise<void> {
        // return this._client
    }

    getClient() {
        return {
            publish: () => { }
        }
    }
}

export const natsClient = new MockNatsClient()