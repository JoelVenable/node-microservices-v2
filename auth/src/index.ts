
import mongoose from 'mongoose';
import app from './app'
const { MONGO_CONNECTION_URI } = process.env
if (typeof MONGO_CONNECTION_URI !== 'string') throw new Error('Connection URI undefined')

const start = async () => {
    try {
        await mongoose.connect(MONGO_CONNECTION_URI, {
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

