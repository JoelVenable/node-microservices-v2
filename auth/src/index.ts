import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import userRouter from './routes';
import { errorHandler } from './middlewares';
import { NotFoundError } from './@types';
import mongoose from 'mongoose';

const app = express();
app.use(json());


app.use('/api/users', userRouter);

app.all('*', () => { throw new NotFoundError() });

app.use(errorHandler);



const start = async () => {
    try {

        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Mongodb connected')
    } catch (err) {
        console.log('Inside Catch block')
        console.error(err);
    }
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
}



start()

