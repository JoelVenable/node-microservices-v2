import CommonError, { SerializeResponse } from "./CommonError";


export default class DatabaseConnectionError extends CommonError {

    statusCode: number = 500;



    private reason = 'Error connectiong to database'

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)

    }

    serializeErrors(): SerializeResponse {
        return { errors: [{ message: this.reason }] }
    }
}