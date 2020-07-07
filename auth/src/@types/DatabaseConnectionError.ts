

export default class DatabaseConnectionError extends Error {

    readonly message = 'Error connectiong to database'
    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}