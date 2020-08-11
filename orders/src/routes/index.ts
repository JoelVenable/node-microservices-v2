import express from 'express';
import newTicket from './newTicket';
import getTicketById from './getTicketById';
import getTicketList from './getTicketList';
import { currentUser } from '@jdvtickets/common';
import updateTicket from './updateTicket';

const ordersRouter = express.Router();

ordersRouter.use(currentUser)

getTicketList(ordersRouter)
newTicket(ordersRouter)
getTicketById(ordersRouter)
updateTicket(ordersRouter)

export default ordersRouter