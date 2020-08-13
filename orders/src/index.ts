import mongoose from "mongoose";
import app from "./app";
import { natsClient } from "./client";
import { randomBytes } from "crypto";

const {
  MONGO_CONNECTION_URI,
  NATS_CLIENT_ID,
  NATS_CLUSTER_ID,
  NATS_URL
} = process.env;
if (typeof MONGO_CONNECTION_URI !== "string")
  throw new Error("Connection URI undefined");
if (typeof NATS_CLIENT_ID !== "string")
  throw new Error("Client ID undefined");

const start = async () => {
  try {
    mongoose.set('useCreateIndex', true)
    await mongoose.connect(MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }

  await natsClient.connect({
    uniqueId: NATS_CLIENT_ID,
    serviceName: NATS_CLUSTER_ID,
    serverUrl: NATS_URL,
  });

  app.listen(3000, () => {
    console.log("listening on 3000");
  });
};

start();
