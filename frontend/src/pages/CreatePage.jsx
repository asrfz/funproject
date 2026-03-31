//Vite is the dev server that runs your React code locally, converts it into browser-readable JavaScript, and serves it on localhost so you can see your app while developing.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";




const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(title, content);
    //if(!title.trim() || !content.trim()) {
     // toast.error("All fields are required");
      return;
    //}
    setLoading(true);
    try{
      await api.post("notes", {title, content});
      toast.success("Note created successfully");
      navigate("/");
    }catch(error){{
      toast.error("Error creating note");
      console.error("error creating note", error);
      if(error.response.status === 429){
        return toast.error("Rate limit exceeded. Please try again later.");
      }
    }finally{
      setLoading(false);
    }
  }
    return (
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-4" />
              Back to Notes
            </Link>

            <div classname="card bg-base-100">
              <div calssName="card-body">
                <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">title</span>
                      placeholder
                    </label>
                    <input type="text" placeholder="Note Title" className="input input-bordered"
                    value={title} onChange={(e) => setTitle(e.target.value)}/>
                    
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered h-32"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled = {loading}></button>
                    {loading ? "Creating..." : "Create Note"}
                  
                </form>
            </div>
          </div>
        </div>
        <h1>Hello World</h1>
      </div>
    )
  }
  
  export default App;