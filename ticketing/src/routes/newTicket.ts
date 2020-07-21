import { Router } from "express";
import { UserRequest, requireAuth, validateParams, body } from "@jdvtickets/common";

const newTicket = (ticketRouter: Router) => ticketRouter.post('/',
    requireAuth,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }).notEmpty().withMessage('Price must be greater than 0')
    ],
    validateParams,
    async (req: UserRequest, res) => {
        console.log('hello')
        res.sendStatus(200)
    })

export default newTicket;
