import request from 'supertest'
import app from '../../app'
import { signin, getId, User } from '../../test/authHelper'
import { Ticket } from '../../models'

const userOne = {
    id: getId(),
    email: 'test@test.com',
    password: 'passw0rd!'
}

const userTwo = {
    id: getId(),
    email: 'Dangit bobby',
    password: 'kingOf@hill1'
}

const unauthorized = {
    errors: [
        {
            message: 'Unauthorized'
        }
    ]
}


interface PutRoute {
    id: string
}

interface NewTicket {
    title: string
    price: number
}

interface PutTicket extends NewTicket, PutRoute { }

const postRoute = () => request(app).post('/api/tickets')
const putRoute = ({ id }: PutRoute) => request(app).put(`/api/tickets/${id}`)


const createTicket = (user: User, ticket: NewTicket) => {
    const { session } = signin(user)
    return postRoute().set('Cookie', session).send(ticket)
}

const putTicket = (user: User, { id, title, price }: PutTicket) => {
    const { session } = signin(user)
    return putRoute({ id }).set('Cookie', session).send({ title, price })
}

it('has a route handler listening to PUT /api/tickets', async () => {
    const id = getId()
    const response = await putRoute({ id })
        .send({});
    expect(response.status).not.toEqual(404)
})


it('can only be accessed if user is signed in', async () => {
    const id = getId()
    const response = await putRoute({ id })
        .send({});


    expect(response.status).toEqual(401)
    expect(response.body).toStrictEqual(unauthorized)
})

it('returns a status other than 401 if user is signed in', async () => {
    const id = getId()

    const response = await putTicket(userOne, {
        id,
        title: 'Nope',
        price: 401.00
    })
    expect(response.status).not.toEqual(401)
})

it('returns a 404 if user is signed in and ticket not found', async () => {
    const id = getId()

    const response = await putTicket(userOne, {
        id,
        title: 'Does not exist',
        price: 404.00
    })
    expect(response.status).toEqual(404)

})

it('returns an unauthorized if ticket is owned by someone else', async () => {

    const created = await createTicket(userOne, {
        title: 'My awesome title',
        price: 11
    })


    expect(created.status).toEqual(201)


    const updated = await putTicket(userTwo, {
        id: created.body.id,
        title: 'You cannot',
        price: 1
    })

    expect(updated.status).toEqual(401)
    expect(updated.body).toStrictEqual(unauthorized)

})

it('updates a ticket with valid inputs', async () => {

    const created = await createTicket(userOne, {
        title: 'My awesome title',
        price: 11.00
    })
    expect(created.status).toEqual(201)

    const { id } = created.body;

    const title = 'It is actually better'
    const price = 1100

    const response = await putTicket(userOne, {
        id,
        title,
        price
    })

    expect(response.status).toEqual(200)
    expect(response.body.title).toEqual(title)
    expect(response.body.price).toEqual(price)






})