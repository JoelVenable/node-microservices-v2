import request from 'supertest'
import app from '../../app'
import { signin, getId } from '../../test/authHelper'
import { Ticket } from '../../models'
import { mongoose } from '@typegoose/typegoose'
import { create } from 'domain'

const user = {
    id: getId(),
    email: 'test@test.com',
    password: 'passw0rd!'
}

interface NewTicket {
    title: string
    price: number
}

interface TicketResponse extends NewTicket {
    id: string
    createdAt: Date
    updatedAt: Date
}

const createTicket = async (ticket: NewTicket): Promise<TicketResponse> => {
    const { session } = signin(user);
    const response = await request(app).post('/api/tickets').set('Cookie', session).send(ticket)
    return response.body as TicketResponse
}

const getList = () => request(app).get(`/api/tickets`)


it('returns an empty array if no tickets', async () => {
    const response = await getList()
        .send()

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual([])
})

it('returns a list of tickets', async () => {

    const tickets: NewTicket[] = [
        {
            title: 'Linkedin Park',
            price: 404.22
        },
        {
            title: 'Amazing Race',
            price: 112.22
        }
    ]

    const createdTickets = await Promise.all(tickets.map(createTicket))

    expect(createdTickets.length).toEqual(2);

    expect(typeof createdTickets[0].id).toEqual('string');
    expect(typeof createdTickets[1].id).toEqual('string');

    const response = await getList();

    expect(response.status).toEqual(200);



    tickets.forEach((t, i) => {
        expect(t.title).toEqual(tickets[i].title)
        expect(t.price).toEqual(tickets[i].price)

    })


})
