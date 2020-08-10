import request from 'supertest';
import app from '../../app';


it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'passw0rd!' })
        .expect(201)
})

it('returns a 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@', password: 'passw0rd!' })
        .expect(400)
})

it('returns a 400 with misconfigured params', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ eil: 'test@test.com', password: 'passw0rd!' })
        .expect(400)
})

it('returns a 400 with malformed password field', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', pasord: 'passw0rd!' })
        .expect(400)
})

it('returns a 400 with invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'pa' })
        .expect(400)
})

it('returns a 400 with missing fields ', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400)
})


it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(400)
})


it('sets a cookie on successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201)

    const cookie = response.get('Set-Cookie')
    expect(cookie).toHaveLength(1);
    expect(cookie[0]).toMatch(new RegExp('^express:sess='))
})