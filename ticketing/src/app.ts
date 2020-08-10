import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@jdvtickets/common';
import cookieSession from 'cookie-session'
import ticketsRouter from './routes'


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    httpOnly: true,
}))


app.use('/api/tickets', ticketsRouter);

app.all('*', () => { throw new NotFoundError() });

app.use(errorHandler);

export default app;
