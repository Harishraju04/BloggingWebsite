import { Link } from "react-router-dom";

function Avatar({name}:{name:string}){
    const finalInput = name.charAt(0).toUpperCase();
    return(
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
             <span className="font-lg text-2xl text-gray-600 dark:text-gray-300">{finalInput}</span>
       </div>
    )

    
}

export const Appbar  = ()=>{
        
        return <div className="border-b flex justify-between p-5">
            <Link to={"/blog"}>
                <div className="text-3xl font-extrabold px-5">
                    Medium
                </div>
            </Link>
            <div className="px-10 flex">
                <Link to={"/publish"}>
                <div className="px-3">
                <button type="button" className=" text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>

                </div>
                </Link>
                <Link to={"/profile"}>
                <Avatar name={localStorage.getItem('username')||"Anonymous"}></Avatar>
                </Link>
            </div>
        </div>
}