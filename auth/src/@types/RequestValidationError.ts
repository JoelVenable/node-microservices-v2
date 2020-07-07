import { ValidationError } from 'express-validator'


export default class RequestValidationError extends Error {

    readonly errors: ValidationError[]

    constructor(public _errors: ValidationError[]) {
        super()
        this.errors = _errors

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
}