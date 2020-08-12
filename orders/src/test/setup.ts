import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongoose } from '@typegoose/typegoose';
import { config } from 'dotenv'
import { join } from 'path'
import { Ticket, Order } from '../models';

const path = join(__dirname, '../../../.env.test')

console.log(path)
config({ path })
let mongo: MongoMemoryServer

jest.mock('../client/NatsClient')

beforeAll(async () => {
    mongo = new MongoMemoryServer();
    const uri = await mongo.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});


beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    await Promise.all(collections.map(async (c) => c.deleteMany({})));
    jest.clearAllMocks();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
});
