import mongoose from "mongoose";

let isConnected: boolean = false;

export const ConnectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true);
    if(isConnected){
        console.log("Mongo DB is already connected!");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL || "",{
            dbName: "next_shop_admin"
        });
        isConnected = true;
        console.log("Mongo DB is connected!");
    } catch (error) {
        console.error(`Error connecting Mongo DB`,error);
    }
}