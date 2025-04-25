import { Link } from "react-router-dom";

interface BlogcardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  tag: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  tag,
  id,
}: BlogcardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="bg-white hover:shadow-md transition-shadow duration-300 rounded-xl p-6 mb-6 border border-gray-200">
        {/* Author and date */}
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <Avatar name={authorName} />
          <span className="ml-2 font-medium">{authorName}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span>{publishedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

        {/* Content preview */}
        <p className="text-gray-600 text-base mb-4">
          {content.slice(0, 300)}
          {content.length > 300 ? "..." : ""}
        </p>

        {/* Tags and read time */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
            {tag}
          </span>
          <span>{`${Math.ceil(content.length / 100)} min read`}</span>
        </div>
      </div>
    </Link>
  );
};

interface AvatarInput {
  name: string;
}

function Avatar({ name }: AvatarInput) {
  const finalInput = name.charAt(0).toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm">
      {finalInput}
    </div>
  );
}
