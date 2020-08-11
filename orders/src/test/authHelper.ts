import { TokenService } from '@jdvtickets/common'
import { mongoose } from '@typegoose/typegoose'

export interface User {
    id: string
    email: string
    password: string
}

interface SigninResponse {
    session: string[]
}

export const getId = () => new mongoose.Types.ObjectId().toHexString();



export const signin = ({ id, email, password }: User): SigninResponse => {

    const jwt = TokenService.sign({ id, email })

    const stringified = JSON.stringify({ jwt })

    const encoded = Buffer.from(stringified).toString('base64')

    const session = [`express:sess=${encoded}`]

    return { session }
}

