import express from 'express';
import { json } from 'body-parser'
import userRouter from './routes'

const app = express();
app.use(json());


app.use('/api/users', userRouter);

app.listen(3000, () => {
    console.log('listening on 3000');
})
