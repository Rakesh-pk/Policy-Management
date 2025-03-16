import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async ()=>{
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to Mongodb')
    } catch (error) {
        console.log('Failed to Connect MongoDB database')
    }
}

export default connectDB;
