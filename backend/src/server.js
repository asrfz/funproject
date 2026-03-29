import express from "express";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});


//mongodb+srv://asarrafz_db_user:fsCX1JEEELESs66m@cluster0.bbc8xtv.mongodb.net/?appName=Cluster0

