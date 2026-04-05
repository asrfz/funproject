import Navbar from "../components/navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [rateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { //runs once when the page loads
    const fetchNotes = async () => { //the actual function occurring
      try {
        const res = await api.get("/notes"); //get req to backend route /notes
        console.log(res.data);
        setNotes(res.data); //gets all notes and puts into notes var
        setIsRateLimited(false);
      } catch (error) {
        console.error("error fetching notes", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {rateLimited && <RateLimitedUI />} 
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {loading && <div className="text-center text-primary py-10">loading notes...</div>}

        {!loading && notes.length === 0 && !rateLimited && <NotesNotFound />}

        {notes.length > 0 && !rateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
