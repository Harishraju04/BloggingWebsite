import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { useBlogs } from "../hooks"
export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();

    if(loading){
        return <div>
            <BlogCardSkeleton></BlogCardSkeleton>
            <BlogCardSkeleton></BlogCardSkeleton>
            <BlogCardSkeleton></BlogCardSkeleton>
            <BlogCardSkeleton></BlogCardSkeleton>
            <BlogCardSkeleton></BlogCardSkeleton>
            <BlogCardSkeleton></BlogCardSkeleton>
        </div>
    }
    return (
        <div>
            <div className="">
                <Appbar ></Appbar>
            </div>
            <div className="flex items-center justify-center">
               <div className="max-w-6xl w-full p-6">
                {
                    blogs.map((blog)=>{
                        return(
                            <BlogCard authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate={blog.published_date} tag={blog.tag} id={blog.id}></BlogCard>
                        )
                    })
                }
              </div>
           </div>
    </div>
    )
}