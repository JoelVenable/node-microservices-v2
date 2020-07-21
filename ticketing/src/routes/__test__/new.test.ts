import request from 'supertest'
import app from '../../app'


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
    expect(response.status).toEqual(401)
})

it('returns an error if invalid title is provided', () => {

})

it('returns an error if invalid price is provided', () => {

})

it('creates a ticket with valid inputs', () => {

})