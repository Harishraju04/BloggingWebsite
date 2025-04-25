import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks";

export const ProfileComponent = () => {
    const navigate = useNavigate();
    const {loading,profile} = useProfile();
    if(loading){
        return <div>
            loading...
        </div>
    }
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-3xl font-extrabold text-gray-800">
              {profile?.name}
            </h1>
            <p className="text-gray-500 text-md mt-1">
              {profile?.email}
            </p>
          </div>
  
          <div className="text-xl font-medium text-gray-700">
            {profile?.description}
          </div>
          <div className="py-2">
            <button onClick={()=>{
              navigate("/updateprofile");
            }} type="button" className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 ">Edit</button>
         </div>
        </div>
        
      </div>
    );
  };
  