import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import userRouter from './routes';
import { errorHandler } from './middlewares';
import { NotFoundError } from './@types';
import cookieSession from 'cookie-session'

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true,
    httpOnly: true,
}))


app.use('/api/users', userRouter);

app.all('*', () => { throw new NotFoundError() });

app.use(errorHandler);

export default app;
