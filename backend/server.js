import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
    res.send("you got 4 notes");
});

app.post("/api/notes", (req, res) => {
    res.status(201).json({message: "Note created"});
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});