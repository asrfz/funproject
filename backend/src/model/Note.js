import mongoose from "mongoose";

// 1-create schema
//2-create model based off schema


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }
    , content: {
        type: String,
        required: true,
    },
    }, 
    {timestamps: true}
);

const Note = mongoose.model("Note", noteSchema);

/*
const Note = mongoose.model(...)

👉 creates something like:

class Note {
  // built-in methods:
  static find() {}
  static findById() {}
  
  save() {}
}
*/
export default Note;
