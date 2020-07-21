import express from 'express';
import newTicket from './newTicket'

const ticketsRouter = express.Router();


ticketsRouter.use(newTicket)

export default ticketsRouter