
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { HttpError, RequestValidationError, DatabaseConnectionError } from '../@types'
import { CommonError } from '../@types'



const errorHandler = (err: CommonError | unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err)

    if (err instanceof CommonError) {
        res.status(err.statusCode).send(err.serializeErrors())
    } else {
        res.status(500).send({
            errors: [
                { message: 'Something went wrong' }
            ]
        })
    }
}


export default errorHandler