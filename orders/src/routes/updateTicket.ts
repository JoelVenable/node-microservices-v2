import { Router, Response } from "express";
import { UserRequest, requireAuth, validateParams, body, param, NotFoundError, UnauthorizedError } from "@jdvtickets/common";
import { Ticket } from "../models";
import { natsClient } from '../client'

import { TicketUpdatedPublisher } from "../events/publishers/TicketUpdatedPublisher";

const newTicket = (ticketRouter: Router) => ticketRouter.put('/:id',
    requireAuth,
    param('id').isString(),
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }).notEmpty().withMessage('Price must be greater than 0')
    ],
    validateParams,
    async (req: UserRequest, res: Response) => {
        const { title, price } = req.body
        const { id: userId } = req.currentUser!

        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) throw new NotFoundError('Ticket')

        if (ticket.userId !== userId) throw new UnauthorizedError();
        ticket.title = title;
        ticket.price = price;

        const response = await ticket.save()

        new TicketUpdatedPublisher(natsClient.getClient()).publish({
            id: response.id!,
            title: response.title,
            version: response.version!,
            price: response.price,
            userId: response.userId
        })

        res.status(200).send(response)
    })

export default newTicket;
