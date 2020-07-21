import request from 'supertest'
import app from '../../app'
import { signin } from '../../test/authHelper'

const user = {
    email: 'test@test.com',
    password: 'passw0rd!'
}

it('has a route handler listening to POST /api/tickets', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});
    expect(response.status).not.toEqual(404)
})


it('can only be accessed if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    const errorResponse = {
        errors: [
            {
                message: 'Unauthorized'
            }
        ]
    }
    expect(response.status).toEqual(401)
    expect(response.body).toStrictEqual(errorResponse)
})

it('returns a status other than 401 if user is signed in', async () => {

    const { session } = signin(user)
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', session)
        .send({});
    expect(response.status).not.toEqual(401)
})

it('returns an error if invalid title is provided', () => {

})

it('returns an error if invalid price is provided', () => {

})

it('creates a ticket with valid inputs', () => {

})