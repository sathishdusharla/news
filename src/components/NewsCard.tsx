import React from 'react';
import { Clock, User } from 'lucide-react';

interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  time: string;
  category: string;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  image,
  author,
  time,
  category,
  featured = false
}) => {
  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`${featured ? 'md:flex' : ''}`}>
        <div className={`${featured ? 'md:w-1/2' : ''}`}>
          <img
            src={image}
            alt={title}
            className={`w-full object-cover ${featured ? 'h-64 md:h-full' : 'h-48'}`}
          />
        </div>
        <div className={`p-6 ${featured ? 'md:w-1/2' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {time}
            </div>
          </div>
          
          <h2 className={`font-bold text-gray-900 mb-3 hover:text-red-600 cursor-pointer transition-colors ${featured ? 'text-2xl' : 'text-lg'}`}>
            {title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm">
              <User className="w-4 h-4 mr-1" />
              {author}
            </div>
            <button className="text-red-600 hover:text-red-800 font-semibold text-sm">
              Read More →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;