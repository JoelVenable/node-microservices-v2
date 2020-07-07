

interface ErrorMessage {
    message: string
    field?: string
}

export interface SerializeResponse {
    errors: ErrorMessage[]
}


export default abstract class CommonError extends Error {

    abstract statusCode: number

    abstract serializeErrors(): SerializeResponse
}