import express from 'express';
import newTicket from './newTicket'
import getTicketById from './getTicketById'
import getTicketList from './getTicketList'
import { currentUser } from '@jdvtickets/common'

const ticketsRouter = express.Router();

ticketsRouter.use(currentUser)

getTicketList(ticketsRouter)
newTicket(ticketsRouter)
getTicketById(ticketsRouter)

export default ticketsRouter