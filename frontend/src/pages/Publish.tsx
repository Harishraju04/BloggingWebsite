import { ChangeEvent, EventHandler, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar/>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-4xl px-6 md:px-10 py-8 bg-white shadow-lg rounded-2xl">
          
            {/* Title Field */}
            <div>
              <label className="block text-2xl font-bold text-gray-800 mb-2">
                Title
              </label>
              <input onChange={(e)=>{setTitle(e.target.value)}}
                type="text"
                placeholder="Enter your blog title..."
                className="w-full p-3 text-lg text-gray-900 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Text Editor */}
            <div>
              <TextEditor onChange={(e)=>{setContent(e.target.value)}}/>
            </div>

            {/* Publish Button */}
            <div className="flex justify-end">
              <button onClick={async ()=>{
                const res = await axios.post("https://medium-backend.harishkurapati2004.workers.dev/api/blog/v1/blog",{
                    title,
                    content
                },
                    {
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                navigate(`/blog/${res.data.blogid}`);
              }} className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-semibold rounded-xl text-base transition duration-200">
                Publish
              </button>
            </div>
          
        </div>
      </div>
    </div>
  );
};

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <div>
      <label className="block text-xl font-bold text-gray-800 mb-2">
        Your Story
      </label>
      <textarea onChange={onChange}
        placeholder="Start writing your story..."
        className="w-full h-60 p-4 text-lg text-gray-900 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
      ></textarea>
    </div>
  );
}
