import { Link } from "react-router-dom";

interface BlogcardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    tag:string,
    id:string
}

export const BlogCard = ({ authorName, title, content, publishedDate,tag,id}:BlogcardProps)=>{
    return (
        <Link to={`/blog/${id}`}>
             <div className="border-b-2 border-slate-200 cursor-pointer">
        <div className="flex p-2">
        <Avatar name={authorName}></Avatar> 
        <div className=" font-medium font px-2">{authorName}</div> 
        <div className="flex justify-center flex-col text-xs text-slate-400"> &#9679;</div>
        <div className="px-2 font-thin text-slate-500">{publishedDate}</div> 
        </div>
        <div className="font-extrabold text-3xl p-2">
            {title}
        </div>
        <div className="font-medium text-slate-600 px-2 text-lg">
            {content.slice(0,300)}{content.length>100 ? ".....":""}
        </div>
        <div className="font-thin slate-500 p-4 flex">
            <div className="font-normal text-md bg-slate-200 rounded-xl w-auto">
                <div className="flex justify-center flex-col">
                <div className="px-2">{tag}</div>
                </div>
            </div>
            <div className="px-3 ">
            {`${Math.ceil(content.length/100)} minutes read`}
            </div>
        </div>

        
    </div>
        </Link>
    )
}

interface Avatarinput{
    name:string
}
function Avatar({name}:Avatarinput){
    const finalInput = name.charAt(0).toUpperCase();
    return(
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
             <span className="font-medium text-gray-600 dark:text-gray-300">{finalInput}</span>
       </div>
    )

    
}