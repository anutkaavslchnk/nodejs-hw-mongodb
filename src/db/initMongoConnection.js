import mongoose from "mongoose";
import { BD_VARS } from "../constants/constants.js";
import { env } from "../utils/env.js";

export const initMongoConnection=async()=>{
    try {
        const user=env(BD_VARS.MONGODB_USER);
        const password=env(BD_VARS.MONGODB_PASSWORD);
        const url=env(BD_VARS.MONGODB_URL);
        const db=env(BD_VARS.MONGODB_DB);
        await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=contacts`)
        console.log('Success');
    } catch (error) {
        console.error('Connection error:', error);

    }
}
