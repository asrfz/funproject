import express from "express";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";


dotenv.config();

const port = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();

if(process.env.NODE_ENV === "development"){
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}   
app.use(express.json()); //turns frontend data into json
app.use(rateLimiter);


app.use((req, res, next) => {
    console.log(`req method is ${req.method} and the url is ${req.url} and the body is ${req.body}`)
    next();
});
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"))
    });
}


connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log("Server is running on port 5001");
    });
}).catch((error) => {
    console.error("error connecting to MongoDB", error);
    process.exit(1); // exit with failure
});



