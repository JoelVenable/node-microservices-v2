import { Router, Response } from "express";
import { UserRequest, validateParams, param, NotFoundError, requireAuth } from "@jdvtickets/common";
import { Order } from "../models";

const getTicketList = (orderRouter: Router) => orderRouter.get('/',
    requireAuth,
    async (req: UserRequest, res: Response) => {
        const userId = req.currentUser!.id

        const orders = await Order.find({
            userId
        })

        res.send(orders)

    })

export default getTicketList;
