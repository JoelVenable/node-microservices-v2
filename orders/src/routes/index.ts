import express from 'express';
import getMyOrders from './getMyOrders';
import getOrderById from './getOrderById';
import createOrder from './createOrder';
import cancelOrder from './cancelOrder';
import { currentUser } from '@jdvtickets/common';

const ordersRouter = express.Router();

ordersRouter.use(currentUser)

getMyOrders(ordersRouter)
getOrderById(ordersRouter)
createOrder(ordersRouter)
cancelOrder(ordersRouter)

export default ordersRouter