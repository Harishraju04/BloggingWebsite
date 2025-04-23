export const BlogCardSkeleton = () => {
    return (
      <div className="border-b-2 border-slate-200 p-4 animate-pulse max-w-screen">
        {/* Author Row */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="text-xs text-slate-400">&#9679;</div>
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
        </div>
  
        {/* Title */}
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
  
        {/* Content Preview */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
        </div>
  
        {/* Tag & Read Time */}
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 rounded-xl px-3 py-1 w-20 h-6"></div>
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };
  