import CommonError, { SerializeResponse } from "./CommonError";


export default class NotFoundError extends CommonError {
    statusCode = 404;

    private _resource: string

    constructor(resource: string = 'Route') {
        super();
        this._resource = resource
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(): SerializeResponse {
        return { errors: [{ message: `${this._resource} Not Found` }] }
    }
}