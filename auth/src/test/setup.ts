import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';

let mongo: MongoMemoryServer

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
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
});