import request from 'supertest';
import app from '../../app';
import { user, signin } from '../../test/authHelper'


const route = '/api/users/signin'



beforeEach(async () => {
    await signin()
})

it('returns a 200 on successful signin', async () => {
    const response = await request(app)
        .post(route)
        .send(user)
        .expect(200)
})

it('returns the correct shape', async () => {
    const response = await request(app)
        .post(route)
        .send(user)
        .expect(200)

    const { email, id, createdAt, updatedAt } = response.body

    expect(email).toEqual(user.email);
    expect(typeof id).toEqual('string');
    expect(typeof createdAt).toEqual('string');
    expect(typeof updatedAt).toEqual('string');
})


it('sets a cookie on successful signin', async () => {
    const response = await request(app)
        .post(route)
        .send(user)
        .expect(200)

    const cookie = response.get('Set-Cookie')
    expect(cookie).toBeDefined();
})


it('fails when a nonexistent user signs in', async () => {
    const response = await request(app)
        .post(route)
        .send({ email: 'invalid@user.com', password: 'nope' })
        .expect(401)
})

it('fails when an invalid password is provided', async () => {
    const response = await request(app)
        .post(route)
        .send({ email: user.email, password: 'nope' })
        .expect(401)

    const cookie = response.get('Set-Cookie')
    expect(cookie).toBeUndefined();
})