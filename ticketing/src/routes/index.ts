import express from 'express';
import newTicket from './newTicket'
import { currentUser } from '@jdvtickets/common'

const ticketsRouter = express.Router();

ticketsRouter.use(currentUser)

newTicket(ticketsRouter)

export default ticketsRouter