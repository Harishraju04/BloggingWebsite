import { Link } from "react-router-dom"
import { LabeledInput } from "./LabeledInput"
import { useState } from "react"
import { SignUpSchemaType } from "@rajuraju9884/medium-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Auth = ({type}:{type:"signup"|"signin"})=>{
    const [postInputs,setPostInputs] = useState<SignUpSchemaType>({
        email:"",
        name:"",
        password:""
    })
    const navigate = useNavigate();

   async function sendRequest(){
       try{
        const res = await axios.post(`https://medium-backend.harishkurapati2004.workers.dev/api/user/v1/${type === 'signup' ? "signup":"signin"}`,postInputs);
        const jwt = "Bearer "+res.data.token;
        localStorage.setItem('token',jwt);
        localStorage.setItem('username',postInputs.email);
        navigate("/blog");
       }
       catch(err){
        alert("User Sign up failed");
       }
    }
    return (
        <div className="bg-slate-100">
            <div className="flex justify-center h-screen flex-col ">
        <div className="flex justify-center">
            <div className="shadow-2xl bg-white rounded-xl p-5">
               <div className="font-extrabold text-4xl px-10">
                    {type == 'signup'?"Create an Account":"Login To Your Account"}
               </div>
               <div className="flex justify-center">
                   <div className="text-slate-400 font-medium">
                     { type==="signup" ? "Already have an account?" : "Don't have an account?"}
                    </div> 
                    <Link to={ type === "signup"?"/signin":"/signup"}className="font-medium px-2 text-slate-400 underline hover: cursor-pointer">
                        {type==="signup"?"login":"signup"}
                    </Link>
               </div>
               <div>
                {type === "signup"?<LabeledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        name : e.target.value
                    }))
                }}></LabeledInput>:null}
               </div>
               <div>
                <LabeledInput label="Email" placeholder="Enter your Email" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        email : e.target.value
                    }))
                }}></LabeledInput>
               </div>
               <div>
                <LabeledInput label="Password" type={"password"} placeholder="Enter your Password" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        password : e.target.value
                    }))
                }}></LabeledInput>
               </div>

            <div className="flex justify-center py-3">
            <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "signup" : "signin"}</button>
            </div>

            </div>
            
        </div>
    </div>
        </div>
    )
}