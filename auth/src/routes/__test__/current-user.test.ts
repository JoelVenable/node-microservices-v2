import request from 'supertest';
import app from '../../app';

const route = '/api/users/currentuser'

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