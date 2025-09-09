import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateProfileCom = ({currname,curremail,currdescription}:{currname?:string,curremail?:string,currdescription?:string}) => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();
    async function handler(){
        await axios.put('https://medium-backend.harishkurapati2004.workers.dev/api/user/v1/updateprofile',{
            ...(name && {name}),
            ...(email && {email}),
            ...(description && {description})
        },{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
        if(email!=""){
            localStorage.setItem('username',email);
        }
        navigate('/blog');
        alert('Details updated successfully');
    }
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Profile</h2>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                    <input onChange={(e)=>{
                        setName(e.target.value);
                    }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder={currname}
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder={curremail}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        onChange={(e)=>{
                            setDescription(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 resize-none"
                        placeholder={currdescription}
                        rows={4}
                        required
                    ></textarea>
                </div>

                <button
                    onClick={handler}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};
