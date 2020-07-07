import { CommonError } from ".";


export default class NotFoundError extends CommonError {
    statusCode = 404;

    constructor(resource?: string) {
        super(resource ? `${resource} not found` : 'Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return { errors: [{ message: this.message }] }
    }


}