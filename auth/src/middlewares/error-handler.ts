
import { Request, Response, NextFunction } from 'express'
import { CommonError } from '../@types'



const errorHandler = (err: CommonError, req: Request, res: Response, next: NextFunction) => {
    if ('serializeErrors' in err) {
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