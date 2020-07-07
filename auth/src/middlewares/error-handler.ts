
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { HttpError, RequestValidationError, DatabaseConnectionError } from '../@types'

type ErrorTypes = Error | HttpError | RequestValidationError | DatabaseConnectionError

interface ErrorMessage {
    message: string
    field?: string
}

const errorHandler = (err: ErrorTypes, req: Request, res: Response, next: NextFunction) => {
    console.error(err)


    if (err instanceof HttpError) {
        const { statusCode, message } = err
        res.status(statusCode).send({ errors: [{ message }] })
    }
    if (err instanceof RequestValidationError) {
        const errors: ErrorMessage[] = err.errors.map(({ msg, param }) => ({ message: msg, field: param }))
        res.status(400).send({ errors })
    }

    if (err instanceof DatabaseConnectionError) {
        const errors = [{ message: err.message }]
        res.status(500).send({ errors })
    }

    if ('message' in err) {
        const { message } = err
        res.status(400).send({
            errors: [
                { message }
            ]
        })
    }

    res.status(400).send({
        errors: [
            { message: 'Something went wrong' }
        ]
    })




}


export default errorHandler