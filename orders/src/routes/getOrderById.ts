import { Router, Response } from "express";
import { UserRequest, validateParams, param, NotFoundError, HttpError, UnauthorizedError, requireAuth } from "@jdvtickets/common";
import { Order, OrderDocument } from "../models";

const getTicketById = (orderRouter: Router) => orderRouter.get('/:orderId',
    requireAuth,
    param('orderId').isString(),
    validateParams,
    async (req: UserRequest, res: Response) => {
        const { orderId } = req.params;
        const { id: userId } = req.currentUser!

        let order: OrderDocument | null
        try {
            order = await Order.findById(orderId).populate('Ticket')
        } catch (err) {
            // console.log(err)
            throw new NotFoundError('Ticket')
        }
        if (!order) throw new NotFoundError('Ticket')

        if (order.userId !== userId) throw new UnauthorizedError()

        res.status(200).send(order)

    })

export default getTicketById;
