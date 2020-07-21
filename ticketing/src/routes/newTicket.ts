import { Router } from "express";
import { UserRequest, requireAuth } from "@jdvtickets/common";

const newTicket = (ticketRouter: Router) => ticketRouter.post('/',
    requireAuth,
    async (req: UserRequest, res) => {
        console.log('hello')
        res.sendStatus(200)
    })

export default newTicket;
