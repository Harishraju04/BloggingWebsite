import axios from "axios";
import { use, useEffect, useState } from "react";
interface blogsType{
    "title": string,
    "content": string,
    "published": boolean,
    "id":string,
   "author": {
        "name": string
    }
}
export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<blogsType[]>([]);
    useEffect(()=>{
        axios.get("https://medium-backend.harishkurapati2004.workers.dev/api/blog/v1/blog/bulk",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(res=>{
            setBlogs(res.data.res);
            
            setLoading(false);
        })
    },[]);
    return {
        loading,blogs
    }
}


export const useBlog=({id}:{id:string})=>{
    const [loading,setloading] = useState(false);
    const [blog,setBlog] = useState<blogsType>();
    

    useEffect(()=>{
        axios.get(`https://medium-backend.harishkurapati2004.workers.dev/api/blog/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(res=>{
            setBlog(res.data.blog);
            
            setloading(false);
        })
    },[])
    return{
        loading,
        blog,
        
    }
}