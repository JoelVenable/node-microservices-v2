import { Response, NextFunction } from 'express'
import { UserRequest } from './current-user'
import { UnauthorizedError } from '../errors'

const requireAuth = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.currentUser) throw new UnauthorizedError();
    next();
}

export default requireAuth;
