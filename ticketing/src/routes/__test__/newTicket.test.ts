import request from 'supertest'
import app from '../../app'
import { signin } from '../../test/authHelper'

const user = {
    email: 'test@test.com',
    password: 'passw0rd!'
}

const postRoute = () => request(app).post('/api/tickets')

const postSignedIn = () => {
    const { session } = signin(user)
    return postRoute().set('Cookie', session)
}

it('has a route handler listening to POST /api/tickets', async () => {
    const response = await postRoute()
        .send({});
    expect(response.status).not.toEqual(404)
})


it('can only be accessed if user is signed in', async () => {
    const response = await postRoute()
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
    const response = await postSignedIn()
        .send({});
    expect(response.status).not.toEqual(401)
})

it('returns an error if invalid title is provided', async () => {
    const response = await postSignedIn()
        .send({
            title: '',
            price: 10
        })
    expect(response.status).toEqual(400)
})

it('returns an error if invalid price is provided', () => {

})

it('creates a ticket with valid inputs', () => {

})