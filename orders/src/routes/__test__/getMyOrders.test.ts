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

const getRoute = () => request(app).get('/api/orders')

const getSignedIn = (user: typeof userOne) => {
    const { session } = signin(user)
    return getRoute().set('Cookie', session)
}

const buildTicket = async () => {
    return Ticket.create({
        title: 'Awesome ticket',
        price: 23
    })
}

it('returns an error if unauthenticated', async () => {
    const response = await getRoute()
    expect(response.status).toEqual(401)
})


it('returns a list of orders for a particular user', async () => {

    // create three tickets
    const ticketOne = await buildTicket()
    const ticketTwo = await buildTicket()
    const ticketThree = await buildTicket()


    const orderOne = await Order.create({
        ticket: ticketOne,
        userId: userOne.id,
        status: OrderStatusType.CREATED,
        expiresAt: new Date()
    })

    const orderTwo = await Order.create({
        ticket: ticketTwo,
        userId: userTwo.id,
        status: OrderStatusType.CREATED,
        expiresAt: new Date()
    })

    const orderThree = await Order.create({
        ticket: ticketThree,
        userId: userTwo.id,
        status: OrderStatusType.CREATED,
        expiresAt: new Date()
    })


    const { body: bodyOne } = await getSignedIn(userOne).expect(200)
    const { body: bodyTwo } = await getSignedIn(userTwo).expect(200)


    expect(bodyOne).toBeInstanceOf(Array)
    expect(bodyTwo).toBeInstanceOf(Array)


    expect(bodyOne).toHaveLength(1)

    expect(bodyOne[0].id).toEqual(orderOne.id)
    expect(bodyOne[0].userId).toEqual(userOne.id)
    expect(bodyOne[0].ticket.id).toEqual(ticketOne.id)

    bodyTwo.forEach((order: any) => {
        expect(order.ticket.version).toEqual(1)
    })
})
