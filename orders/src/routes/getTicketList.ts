import { Router, Response } from "express";
import { UserRequest, validateParams, param, NotFoundError } from "@jdvtickets/common";
import { Ticket } from "../models";

const getTicketList = (ticketRouter: Router) => ticketRouter.get('/',
    async (req: UserRequest, res: Response) => {

        try {
            const tickets = await Ticket.find({})
            res.status(200).send(tickets)
        } catch (err) {
            // console.log(err)
            throw new NotFoundError('Ticket')
        }

    })

export default getTicketList;
