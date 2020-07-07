import express from 'express';
import { json } from 'body-parser'
import userRouter from './routes'
import { errorHandler } from './middlewares'
import { NotFoundError } from './@types';

const app = express();
app.use(json());


app.use('/api/users', userRouter);

app.all('*', () => { throw new NotFoundError() })

app.use(errorHandler);



app.listen(3000, () => {
    console.log('listening on 3000');
})
