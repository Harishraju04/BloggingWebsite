import axios from "axios";
import {useEffect, useState } from "react";
interface blogsType{
    "title": string,
    "content": string,
    "published": boolean,
    "id":string,
    "tag":string,
    "published_date":string,
   "author": {
        "description": string;
        "name": string
    }
}
interface profileType{
    "email":string,
    "name":string,
    "description"?: string
}
export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<blogsType[]>([]);
    useEffect(()=>{
        axios.get("https://medium-backend.harish9884.workers.dev/api/blog/v1/blog/bulk",{
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

export const useProfile=()=>{
    const [loading,setLoading] = useState(true);
    const [profile,setProfile] = useState<profileType>();
    useEffect(()=>{
        axios.get(`https://medium-backend.harish9884.workers.dev/api/user/v1/profile`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>{
            setProfile(res.data.res);
            setLoading(false);
        })
    },[])

    return{
        loading,profile
    }
}

export const useBlog=({id}:{id:string})=>{
    const [loading,setloading] = useState(false);
    const [blog,setBlog] = useState<blogsType>();
    

    useEffect(()=>{
        axios.get(`https://medium-backend.harish9884.workers.dev/api/blog/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(res=>{
            setBlog(res.data.blog);
            
            setloading(false);
        })
    },[])
    let date = blog?.published_date.split("T")[0];
    if(blog){
        blog.published_date = date || "";
    }
    return{
        loading,
        blog,
        
    }
}