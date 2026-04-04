import express from "express";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

//imports + load .env vars

dotenv.config();

//create the server
const port = process.env.PORT || 5001;
const app = express(); // app is a server using express
const __dirname = path.resolve();

//if in dev mode, then keep in mind cors -> this allows for fetching from different port
if(process.env.NODE_ENV === "development"){
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}   
app.use(express.json()); //turns incoming data into json
app.use(rateLimiter); //runs ratelimiter check


app.use((req, res, next) => { //logging req info
    console.log(`req method is ${req.method} and the url is ${req.url} and the body is ${req.body}`)
    next();
});
app.use("/api/notes", notesRoutes); //only runs this function if the path matches /api/notes

if(process.env.NODE_ENV === "production"){ //if in production, serve frontend statically from the dist folder
    app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))

    app.get("*", (req, res) => { // if the route isn't a backend route, then send index.html so the frontend can handle it (because it's probably a FE route)
        res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"))
    });
}


connectDB().then(() => { // only start the server after the db connects
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log("Server is running on port 5001");
    });
}).catch((error) => {
    console.error("error connecting to MongoDB", error);
    process.exit(1); // exit with failure
});



