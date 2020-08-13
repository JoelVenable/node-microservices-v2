import request from 'supertest'
import app from '../../app'
import { signin, getId } from '../../test/authHelper'
import { Ticket, Order, OrderStatusType } from '../../models'
import { natsClient } from '../../client'

const userOne = {
    id: getId(),
    email: 'test@test.com',
    password: 'passw0rd!'
}

const userTwo = {
    id: getId(),
    email: 'testtwo@test.com',
    password: 'passw0rd!'
}

const getRoute = (id: string) => request(app).get(`/api/orders/${id}`)

const getSignedIn = (user: typeof userOne, id: string) => {
    const { session } = signin(user)
    return getRoute(id).set('Cookie', session)
}

const buildTicket = async () => {
    const ticket = await Ticket.create({
        title: 'Awesome ticket',
        price: 23
    })

    // @ts-ignore
    ticket.createdAt = ticket.createdAt.toISOString()

    // @ts-ignore
    ticket.updatedAt = ticket.updatedAt.toISOString()
    return ticket
}

it('returns an error if unauthenticated', async () => {
    const response = await getRoute('asdf')
    expect(response.status).toEqual(401)
})

it('fetches an order', async () => {

    const ticket = await buildTicket()

    const orderOne = await Order.create({
        ticket,
        userId: userOne.id,
        status: OrderStatusType.CREATED,
        expiresAt: new Date()
    })

    const { body } = await getSignedIn(userOne, orderOne.id).expect(200)

    expect(body.ticket.id).toEqual(ticket.id)
    expect(body.ticket.price).toEqual(ticket.price)

    expect(body.userId).toEqual(userOne.id)
    expect(body.status).toEqual(OrderStatusType.CREATED)
})

it('disallows fetching an order from someone else', async () => {
    const ticket = await buildTicket()

    const orderTwo = await Order.create({
        ticket,
        userId: userTwo.id,
        status: OrderStatusType.CREATED,
        expiresAt: new Date()
    })

    await getSignedIn(userOne, orderTwo.id).expect(401)
})

