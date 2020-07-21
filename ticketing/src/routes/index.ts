import express from 'express';
import newTicket from './newTicket'
import getTicketById from './getTicketById'
import { currentUser } from '@jdvtickets/common'

const ticketsRouter = express.Router();

ticketsRouter.use(currentUser)


newTicket(ticketsRouter)
getTicketById(ticketsRouter)

export default ticketsRouter