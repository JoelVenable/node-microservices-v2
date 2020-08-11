import mongoose from "mongoose";
import app from "./app";
import { natsClient } from "./client";
import { randomBytes } from "crypto";

const { MONGO_CONNECTION_URI } = process.env;
if (typeof MONGO_CONNECTION_URI !== "string")
  throw new Error("Connection URI undefined");

const start = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }

  await natsClient.connect({
    uniqueId: randomBytes(3).toString("hex"),
    serverUrl: "http://nats-srv:4222",
  });

  app.listen(3000, () => {
    console.log("listening on 3000");
  });
};

start();
