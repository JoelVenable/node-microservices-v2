import request from 'supertest'
import app from '../../app'
import { signin, getId } from '../../test/authHelper'
import { Ticket } from '../../models'
import { mongoose } from '@typegoose/typegoose'

const user = {
    email: 'test@test.com',
    password: 'passw0rd!'
}

const testTicket = {
    title: 'My awesome ticket',
    price: 120.22
}

interface GetRoute {
    id: string
}

const postSignedIn = () => {
    const { session } = signin(user);
    return request(app).post('/api/tickets').set('Cookie', session).send(testTicket)
}

const getRoute = ({ id }: GetRoute) => request(app).get(`/api/tickets/${id}`)

const getSignedIn = ({ id }: GetRoute) => {
    const { session } = signin(user)
    return getRoute({ id }).set('Cookie', session)
}

it('returns 404 if ticket is not found', async () => {
    const id = getId()
    const response = await getSignedIn({ id })
        .send()

    const expected = {
        errors: [
            {
                message: 'Ticket Not Found'
            }
        ]
    }

    expect(response.status).toEqual(404)
    expect(response.body).toStrictEqual(expected)
})

it('returns a ticket if the ticket is found', async () => {
    const postResponse = await postSignedIn()
    const { id } = postResponse.body
    expect(postResponse.status).toEqual(201)
    expect(typeof id).toEqual('string')

    const response = await getSignedIn({ id })

    expect(response.status).toEqual(200);
    const { title, price, userId, id: responseId } = response.body

    expect(responseId).toEqual(id)
    expect(title).toEqual(testTicket.title)
    expect(price).toEqual(testTicket.price)
    expect(userId).toEqual('123')
})
