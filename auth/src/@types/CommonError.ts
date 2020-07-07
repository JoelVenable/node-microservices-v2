

interface ErrorMessage {
    message: string
    field?: string
}

export interface SerializeResponse {
    errors: ErrorMessage[]
}


export default abstract class CommonError extends Error {

    constructor() {
        super();
        Object.setPrototypeOf(this, CommonError.prototype)
    }

    abstract statusCode: number

    abstract serializeErrors(): SerializeResponse
}