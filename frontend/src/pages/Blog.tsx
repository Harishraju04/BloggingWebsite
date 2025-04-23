import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar";
import { FullBlogSkeleton } from "../components/FullBlogskeleton";

export function Blog(){
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id: id || ""
    });
    if(loading || !blog){
        return(
            <div>
                <FullBlogSkeleton></FullBlogSkeleton>
            </div>
        )
    }
    return <div>
        <Appbar></Appbar>
       <FullBlog title={blog.title} content={blog.content} author={blog.author.name} date={"23-04-2025"}></FullBlog>
    </div>
}