import Note from "../model/Note.js";


export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.error("error fetching notes", error);
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title: title, content: content });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.error("error creating note", error);
    }
};

export const updateNote = (req, res) => {
    res.status(200).json({message: "Note updated"});
};

export const deleteNote = (req, res) => {
    res.status(200).json({message: "Note deleted"});
};