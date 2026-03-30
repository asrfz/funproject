import express from "express";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";


dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

connectDB();

app.use(express.json()); //turns frontend data into json
app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`req method is ${req.method} and the url is ${req.url} and the body is ${req.body}`)
    next();
});
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
    console.log("Server is running on port 5001");
});



