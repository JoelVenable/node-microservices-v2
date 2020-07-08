import request from 'supertest'
import app from '../app'

export const user = { email: 'test@test.com', password: 'passw0rd!' }



export const signin = async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(201)

    const cookie = response.get('Set-Cookie')
    expect(cookie).toBeDefined()

    return cookie
}
