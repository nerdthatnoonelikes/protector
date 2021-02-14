import ProtectorClient from "./Client";
import { owner, token, mongoDB } from "../config";
import mongoose from "mongoose";

const client: ProtectorClient = new ProtectorClient({ token, owner });

(() => {
  mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  client.start();
})();
