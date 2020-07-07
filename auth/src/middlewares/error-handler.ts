
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import HttpError from '../@types/HttpError'

const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error(err)

    if ('statusCode' in err) {
        const { statusCode, message } = err
        res.status(statusCode).send({ message })
    } else {
        res.status(500).send({ message: 'Something went wrong' })
    }

}


export default errorHandler