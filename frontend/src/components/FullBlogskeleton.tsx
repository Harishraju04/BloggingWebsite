export const FullBlogSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen px-4 py-10 gap-8 bg-white animate-pulse">
        
        {/* Blog Content Skeleton */}
        <div className="md:col-span-8 px-10 space-y-6">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="space-y-3 pt-6">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded w-10/12"></div>
            <div className="h-4 bg-gray-200 rounded w-9/12"></div>
          </div>
        </div>
  
        {/* Sidebar Skeleton */}
        <div className="md:col-span-4 p-10 space-y-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  };
  