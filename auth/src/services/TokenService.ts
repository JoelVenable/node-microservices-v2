import jwt from 'jsonwebtoken'
import { UserDocument } from '../models'


const { JWT_SIGNING_KEY } = process.env;
if (typeof JWT_SIGNING_KEY !== 'string') throw new Error('Missing environment variable!')


interface UserToken {
    id: string
    email: string
}

export class TokenService {

    public static sign(user: UserDocument) {
        return jwt.sign({
            id: user.id,
            email: user.email
        }, JWT_SIGNING_KEY!)
    }

    public static verify(token: any): UserToken {
        return jwt.verify(token, JWT_SIGNING_KEY!) as UserToken
    }
}