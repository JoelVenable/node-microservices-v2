import CommonError, { SerializeResponse } from "./CommonError";



export default class HttpError extends CommonError {


    statusCode: number;


    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode

    }

    serializeErrors(): SerializeResponse {
        return { errors: [{ message: this.message }] }
    }
}