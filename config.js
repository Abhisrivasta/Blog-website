import mongoose from "mongoose";

const connectToDB = async (url) => {
    try {
        return await mongoose.connect(url); 
    } catch (error) {
        console.log("MongoDb connection error", error);
    }
}

export default connectToDB;