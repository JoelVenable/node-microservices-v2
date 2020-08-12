import { Router, Response } from "express";
import { UserRequest, requireAuth, validateParams, body, NotFoundError, HttpError } from "@jdvtickets/common";
import { natsClient } from '../client'
import { Ticket, Order, OrderStatusType, TicketDocument } from "../models";
import { TicketCreatedPublisher } from "../events/publishers";
import { addMinutes } from 'date-fns'


const EXPIRATION_WINDOW_MINUTES = 15

const newOrder = (orderRouter: Router) => orderRouter.post('/',
    requireAuth,
    [
        body('ticketId')
            .notEmpty()
            .withMessage('TicketId is required'),
    ],
    validateParams,
    async (req: UserRequest, res: Response) => {
        const { ticketId } = req.body
        const { id: userId } = req.currentUser!

        // find the ticket

        let requestedTicket: TicketDocument | null
        try {
            requestedTicket = await Ticket.findById(ticketId)
        } catch (err) {
            throw new NotFoundError('Ticket')
        }
        if (!requestedTicket) throw new NotFoundError('Ticket')

        //  Check if it's already reserved
        if (await requestedTicket.isReserved()) throw new HttpError(400, 'Ticket is already reserved')

        // Calculate expiration date

        const expiresAt = addMinutes(new Date(), EXPIRATION_WINDOW_MINUTES)

        // Build the order and save to db.
        const order = await Order.create({
            userId,
            status: OrderStatusType.CREATED,
            expiresAt,
            ticket: requestedTicket
        })


        // Publish order:created event

        // const ticket = await Ticket.create({ price, title, userId })
        // const client = natsClient.getClient()

        // new TicketCreatedPublisher(client)
        //     .publish({
        //         id: ticket.id,
        //         title: ticket.title,
        //         price: ticket.price,
        //         version: ticket.version!,
        //         userId: ticket.userId
        //     })
        res.status(201).send(order)
    })

export default newOrder;


