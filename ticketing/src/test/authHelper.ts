import { TokenService } from '@jdvtickets/common'

interface SigninArgs {
    email: string
    password: string
}

interface SigninResponse {
    session: string[]
}


export const signin = ({ email, password }: SigninArgs): SigninResponse => {

    const jwt = TokenService.sign({ id: '123', email })

    const stringified = JSON.stringify({ jwt })

    const encoded = Buffer.from(stringified).toString('base64')

    const session = [`express:sess=${encoded}`]

    return { session }
}
