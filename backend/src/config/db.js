import mongoose from "mongoose";


const connectDB = async () => {
    try{
        mongoose.connect("mongodb+srv://asarrafz_db_user:fsCX1JEEELESs66m@cluster0.bbc8xtv.mongodb.net/?appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("error connecting to MongoDB", error);
        
    }
};

export default connectDB;