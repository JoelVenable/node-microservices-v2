import request from 'supertest';
import app from '../../app';


const route = '/api/users/signout'

const user = { email: 'test@test.com', password: 'passw0rd!' }

let cookie: string[]

beforeEach(async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(201)

    cookie = response.get('Set-Cookie')
    expect(cookie).toBeDefined()
})


it('returns a 204', async () => {
    const response = await request(app)
        .post(route)
        .set('Cookie', cookie)
        .send({})
        .expect(204);


    const clearCookie = response.get('Set-Cookie');
    const expected = [
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    ];

    expect(clearCookie).toEqual(expected)

})