import request from 'supertest';
import app from '../../app';
import { user, signin } from '../../test/authHelper'

const route = '/api/users/currentuser'


let cookie: string[]

beforeEach(async () => {
    cookie = await signin()
})



it('returns the correct shape', async () => {
    const response = await request(app)
        .get(route)
        .set('Cookie', cookie)
        .send({})
        .expect(200);

    const { currentUser } = response.body;

    expect(typeof currentUser.id).toEqual('string');

    expect(currentUser.email).toEqual(user.email);
    expect(typeof currentUser.iat).toEqual('number')
    expect(typeof currentUser.exp).toEqual('number')
})

it('returns null with no cookie', async () => {
    const response = await request(app)
        .get(route)
        .set('Cookie', [])
        .send()
        .expect(200);

    const { currentUser } = response.body;

    expect(currentUser).toBeNull();
})