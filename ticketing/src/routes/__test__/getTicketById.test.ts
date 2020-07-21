import request from 'supertest'
import app from '../../app'
import { signin } from '../../test/authHelper'
import { Ticket } from '../../models'

const user = {
    email: 'test@test.com',
    password: 'passw0rd!'
}

const testTicket = {
    title: 'My awesome ticket',
    price: '120.22'
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
    const response = await getSignedIn({ id: 'asdfawkerwelrkwerlkajdsfasdf' })
        .send()

    const expected = {
        errors: [
            {
                message: 'Ticket not found'
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
    console.log(response.body)
    expect(response.status).toEqual(200);
    const { title, price, userId, id: responseId } = response.body

    expect(responseId).toEqual(id)
    expect(title).toEqual(testTicket.title)
    expect(price).toEqual(testTicket.price)
    expect(userId).toEqual('123')
})

// it('has a route handler listening to POST /api/tickets', async () => {
//     const response = await postRoute()
//         .send({});
//     expect(response.status).not.toEqual(404)
// })


// it('can only be accessed if user is signed in', async () => {
//     const response = await postRoute()
//         .send({});

//     const errorResponse = {
//         errors: [
//             {
//                 message: 'Unauthorized'
//             }
//         ]
//     }
//     expect(response.status).toEqual(401)
//     expect(response.body).toStrictEqual(errorResponse)
// })

// it('returns a status other than 401 if user is signed in', async () => {

//     const { session } = signin(user)
//     const response = await postSignedIn()
//         .send({});
//     expect(response.status).not.toEqual(401)
// })

// it('returns an error if invalid title is provided', async () => {
//     const response = await postSignedIn()
//         .send({
//             title: '',
//             price: 10
//         })
//     expect(response.status).toEqual(400)

//     const secondResponse = await postSignedIn()
//         .send({
//             price: 10
//         })
//     expect(secondResponse.status).toEqual(400)

// })

// it('returns an error if invalid price is provided', async () => {
//     const response = await postSignedIn()
//         .send({
//             title: 'My awesome title',
//             price: -10
//         })
//     expect(response.status).toEqual(400)

//     const secondResponse = await postSignedIn()
//         .send({
//             title: 'My awesome title'
//         })
//     expect(secondResponse.status).toEqual(400)
// })

// it('creates a ticket with valid inputs', async () => {

//     const title = 'My awesome title'
//     const price = 102.23
//     let tickets = await Ticket.find({})
//     expect(tickets.length).toEqual(0)

//     // check mongo for record created.
//     const response = await postSignedIn()
//         .send({
//             title,
//             price
//         })
//     expect(response.status).toEqual(201)

//     tickets = await Ticket.find({})
//     expect(tickets.length).toEqual(1)

//     expect(tickets[0].title).toEqual(title)
//     expect(tickets[0].price).toEqual(price)



// })