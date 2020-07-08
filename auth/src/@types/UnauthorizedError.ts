import { CommonError } from ".";
import { SerializeResponse } from "./CommonError";



export default class UnauthorizedError extends CommonError {
    statusCode = 401;


    constructor() {
        super();
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }

    serializeErrors(): SerializeResponse {
        return { errors: [{ message: 'Unauthorized' }] }
    }

}