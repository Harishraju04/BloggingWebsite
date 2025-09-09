interface FullBlogType{
    title:string,
    content:string,
    author:string,
    date:string,
    description:string
}

export const FullBlog = ({title,content,author,date,description}:FullBlogType) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen px-4 py-10 gap-8 bg-white">
        
        {/* Blog Content */}
        <div className="md:col-span-8 px-10">
          <div className="text-4xl font-black py-6 leading-snug">
            {title}
          </div>
          <div className=" text-md font-light text-gray-500">
            posted on {date}
          </div>
          <div className="text-lg font-medium text-gray-700 space-y-4">
            <p>
                {content}
            </p>
          </div>
        </div>

        {/* Sidebar - Author Info */}
        <div className="md:col-span-4 p-10">
          <div className="text-lg font-semibold text-gray-600 pb-2">
            Author
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {author}
          </div>
          <div>
            {description}
          </div>
        </div>
      </div>
    );
  };
  