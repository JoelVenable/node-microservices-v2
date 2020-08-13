import request from 'supertest'
import app from '../../app'
import { signin, getId } from '../../test/authHelper'
import { Ticket, Order, OrderStatusType } from '../../models'
import { natsClient } from '../../client'

const user = {
    id: getId(),
    email: 'test@test.com',
    password: 'passw0rd!'
}

const postRoute = () => request(app).post('/api/orders')

const postSignedIn = () => {
    const { session } = signin(user)
    return postRoute().set('Cookie', session)
}

it('returns an error if unauthenticated', async () => {
    const response = await postRoute()
    expect(response.status).toEqual(401)
})

it('returns an error if no ticketId', async () => {
    const response = await postSignedIn().send({})
    expect(response.status).toEqual(400)

})

it('returns an error if the ticket does not exist', async () => {
    const response = await postSignedIn().send({ ticketId: '124123' })
    expect(response.status).toEqual(404)
})


it('returns an error if a ticket is reserved', async () => {

    //  Setup
    const ticket = await Ticket.create({
        title: 'Awesome ticket',
        price: 20
    })

    const order = await Order.create({
        ticket,
        userId: 'asdfklsdf',
        status: OrderStatusType.CREATED,
        expiresAt: new Date()
    })

    // Assert
    const response = await postSignedIn().send({ ticketId: ticket.id })

    expect(response.status).toEqual(400)

})


it('reserves a ticket', async () => {
    const ticket = await Ticket.create({
        title: 'Some Other ticket',
        price: 20
    })

    const response = await postSignedIn().send({ ticketId: ticket.id })

    expect(response.status).toEqual(201)

})

it.todo('emits an order created event')