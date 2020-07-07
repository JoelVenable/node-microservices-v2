import CommonError, { SerializeResponse } from "./CommonError";



export default class HttpError extends CommonError {

    public readonly statusCode: number;

    private msg: string

    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode
        this.msg = message;
        Object.setPrototypeOf(this, HttpError.prototype)

    }

    public serializeErrors = (): SerializeResponse => {
        return { errors: [{ message: this.msg }] }
    }
}