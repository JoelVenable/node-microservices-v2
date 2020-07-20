
import mongoose from 'mongoose';
import app from './app'


const MONGO_CONNECTION_STRING = 'mongodb://auth-mongo-srv:27017/auth'

const start = async () => {
    try {
        await mongoose.connect(MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
}

start()

