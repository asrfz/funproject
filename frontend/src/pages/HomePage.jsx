//Vite is the dev server that runs your React code locally, converts it into browser-readable JavaScript, and serves it on localhost so you can see your app while developing.
import Navbar from "../components/navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";


const HomePage = () => {
  const [rateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { //we want to separate fetching from actual rendering - so useeffect is to get data after the component is rendered
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes"); //Axios is used in the frontend to send HTTP requests to a backend, get the response, and then you manually put that data into React state
        
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);

      }catch(error){
        console.error("error fetching notes", error);
        if(error.response && error.response.status === 429){
          setIsRateLimited(true);
        }else{
          toast.error("An error occurred while fetching notes");
        }
      }finally{
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
          {loading && <div className ="text-center text-primary py-10">loading notes...</div>}


          {notes.length === 0 && !isRateLimited && <NotesNotFound />}

          {notes.length > 0 && !rateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNOtes={setNotes}/>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default HomePage;