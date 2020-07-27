import { Request, Response, NextFunction } from 'express'
import { TokenService, UserToken } from '../services'


export interface UserRequest extends Request {
    currentUser?: UserToken
}


const currentUser = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        // @ts-ignore
        const { jwt } = req.session!;
        req.currentUser = TokenService.verify(jwt)
    } catch (err) {
        req.currentUser = undefined;
    }
    next()
}

export default currentUser;
