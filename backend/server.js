import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
    res.send("you got 4 notes");
});

app.post("/api/notes", (req, res) => {
    res.status(201).json({message: "Note created"});
});

app.put("/api/notes/:id", (req, res) => {
    res.status(200).json({message: "Note updated"});
});

app.delete("/api/notes/:id", (req, res) => {
    res.status(200).json({message: "Note deleted"});
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});