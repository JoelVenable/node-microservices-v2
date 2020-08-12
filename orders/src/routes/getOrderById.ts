import { Router, Response } from "express";
import { UserRequest, validateParams, param, NotFoundError } from "@jdvtickets/common";
import { Ticket } from "../models";

const getTicketById = (ticketRouter: Router) => ticketRouter.get('/:id',
    param('id').isString(),
    validateParams,
    async (req: UserRequest, res: Response) => {
        const { id } = req.params;

        // try {
        //     const ticket = await Ticket.findById(id)
        //     if (!ticket) throw new NotFoundError('Ticket')
        //     res.status(200).send(ticket)
        // } catch (err) {
        //     // console.log(err)
        //     throw new NotFoundError('Ticket')
        // }

    })

export default getTicketById;
