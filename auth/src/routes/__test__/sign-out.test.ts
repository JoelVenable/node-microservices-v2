import request from 'supertest';
import app from '../../app';
import { user, signin } from '../../test/authHelper'


const route = '/api/users/signout'

let cookie: string[]

beforeEach(async () => {
    cookie = await signin()
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

it('returns a 204 if no cookie', async () => {
    const response = await request(app)
        .post(route)
        .set('Cookie', [])
        .send({})
        .expect(204);


    const clearCookie = response.get('Set-Cookie');
    const expected = [
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    ];

    expect(clearCookie).toEqual(expected)

})