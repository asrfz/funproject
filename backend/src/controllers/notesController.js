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

export async const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title: title, content: content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.error("error updating note", error);
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.error("error deleting note", error);
    }
};