import { Router, Response } from "express";
import { UserRequest, requireAuth, validateParams, body } from "@jdvtickets/common";
import { natsClient } from '../client'
import { Ticket } from "../models";
import { TicketCreatedPublisher } from "../events/publishers";


const newTicket = (ticketRouter: Router) => ticketRouter.post('/',
    requireAuth,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }).notEmpty().withMessage('Price must be greater than 0')
    ],
    validateParams,
    async (req: UserRequest, res: Response) => {
        const { title, price } = req.body
        const { id: userId } = req.currentUser!

        const ticket = await Ticket.create({ price, title, userId })
        const client = natsClient.getClient()

        new TicketCreatedPublisher(client)
            .publish({
                id: ticket.id,
                title: ticket.title,
                price: ticket.price,
                version: ticket.version!,
                userId: ticket.userId
            })

        res.status(201).send(ticket)
    })

export default newTicket;


