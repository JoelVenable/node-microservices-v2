import { Router, Response } from "express";
import { UserRequest, requireAuth, validateParams, body, param, NotFoundError, UnauthorizedError } from "@jdvtickets/common";
import { Ticket } from "../models";
import { natsClient } from '../client'

// import { TicketUpdatedPublisher } from "../events/publishers/TicketUpdatedPublisher";

const cancelOrder = (orderRouter: Router) => orderRouter.delete('/:orderId',
    requireAuth,
    param('orderId').isString(),
    async (req: UserRequest, res: Response) => {
        // const { title, price } = req.body
        // const { id: userId } = req.currentUser!

        // const ticket = await Ticket.findById(req.params.id);

        // if (!ticket) throw new NotFoundError('Ticket')

        // if (ticket.userId !== userId) throw new UnauthorizedError();
        // ticket.title = title;
        // ticket.price = price;

        // const response = await ticket.save()

        // new TicketUpdatedPublisher(natsClient.getClient()).publish({
        //     id: response.id!,
        //     title: response.title,
        //     version: response.version!,
        //     price: response.price,
        //     userId: response.userId
        // })

        // res.status(200).send(response)

        res.send({})
    })

export default cancelOrder;
