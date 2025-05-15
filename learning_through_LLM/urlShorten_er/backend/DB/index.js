import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async function () {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`connected at ${connectionInstance.connection.host}`);
    //    console.log(process.env.MONGODB_URI);
       
    //    return connectionInstance
    } catch (error) {
        console.error(`DB connection failed ${error}`);
        process.exit(1);
    }
}

export default connectDB