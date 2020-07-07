
import { Request, Response, NextFunction } from 'express'
import { CommonError } from '../@types'
import 'express-async-errors';



const errorHandler = (err: CommonError | unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CommonError) {
        console.log('common error')
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