import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(['8.8.8.8']);

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("MongoDB connected successfully"));
    await mongoose.connect(process.env.MONGODB_URI!);
}

export default connectDB;