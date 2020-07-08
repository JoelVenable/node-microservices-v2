import { Request, Response, NextFunction } from 'express'
import { TokenService } from '../services'
import { UserToken } from '../services/TokenService';


export interface UserRequest extends Request {
    currentUser?: UserToken
}


const currentUser = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { jwt } = req.session!;
        req.currentUser = TokenService.verify(jwt)
    } catch (err) {
        console.log(err)
        req.currentUser = undefined;
    }
    next()
}

export default currentUser;
