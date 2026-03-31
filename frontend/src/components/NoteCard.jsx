import { Link } from "react-router-dom";
import { PenSquareIcon, TrashIcon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {


    const handleDelete = async (e) => {
        e.preventDefault();


        if(!window.confirm("Are you sure you want to delete this note?")) return;


        try{
            await api.delete(`/notes/${note.id}`);
            setNotes((prev) => prev.filter((n) => n._id !== note._id));
            toast.success("Note deleted successfully");
        }catch(error){
            toast.error("Error deleting note");
            console.error("error deleting note", error);
            if(error.response.status === 429){
                return toast.error("Rate limit exceeded. Please try again later.");
            }
        }finally{
            setLoading(false);
        }
    }

    return (
        <Link to={`/notes/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="btn btn-ghost btn-xs">
                            <PenSquareIcon className="size-4" />
                        </button>
                        <button className="btn btn-ghost btn-xs text-error">
                            <TrashIcon className="size-4" onClick={(e) =>handleDelete(e, note.id)}/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NoteCard;
