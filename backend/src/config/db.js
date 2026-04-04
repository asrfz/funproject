import mongoose from "mongoose";


const connectDB = async () => {
    try{ // await means don't continue until it happens --- async means the function takes time and therefore probably has await in it --- await means the function won't continue until this happens
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("error connecting to MongoDB", error);
        process.exit(1); // exit with failure
    }
};

export default connectDB;
