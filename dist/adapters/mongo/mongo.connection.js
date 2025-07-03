import mongoose from "mongoose";
let isConnected = false;
export async function connectToMongoDB(uri) {
    if (isConnected)
        return;
    try {
        await mongoose.connect(uri, {});
        isConnected = true;
        console.log("[IAM] MongoDB connected successfully");
    }
    catch (error) {
        console.error("[IAM] MongoDB connection error:", error);
        throw error;
    }
}
