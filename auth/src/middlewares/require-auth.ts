import { Response, NextFunction } from 'express'
import { UserRequest } from './current-user'
import { UnauthorizedError } from '../@types'

const requireAuth = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.currentUser) throw new UnauthorizedError();
    next();
}

export default requireAuth;
