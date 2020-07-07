import { ValidationError } from 'express-validator'
import CommonError, { SerializeResponse } from './CommonError'


export default class RequestValidationError extends CommonError {
    statusCode = 400;



    readonly errors: ValidationError[]

    constructor(public _errors: ValidationError[]) {
        super()
        this.errors = _errors

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(): SerializeResponse {
        const errors = this.errors.map(({ msg, param }) => ({ message: msg, field: param }))

        return { errors }
    }
}