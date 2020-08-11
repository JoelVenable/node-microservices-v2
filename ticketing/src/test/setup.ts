import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { config } from 'dotenv'
import { join } from 'path'

const path = join(__dirname, '../../../.env.test')
config({ path })
let mongo: MongoMemoryServer

jest.mock('../client/NatsClient')

beforeAll(async () => {
    console.log(process.env.NODE_ENV)
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
