import { Router } from "express";
import { UserRequest, currentUser as currentUserMW, requireAuth } from "@jdvtickets/common";

const newTicket = (ticketRouter: Router) => ticketRouter.post('',
    currentUserMW,
    requireAuth,
    async (req: UserRequest, res) => {
        res.sendStatus(200)
    })

export default newTicket;
