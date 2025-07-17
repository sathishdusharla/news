import React from 'react';
import { TrendingUp, Calendar, Tag } from 'lucide-react';

const Sidebar = () => {
  const trendingNews = [
    "Election Results: Major Victory for Opposition",
    "Stock Market Hits All-Time High",
    "New COVID Variant Detected",
    "Cricket World Cup Finals",
    "Tech Giant Announces Layoffs"
  ];

  const categories = [
    { name: "Politics", count: 45 },
    { name: "Business", count: 32 },
    { name: "Sports", count: 28 },
    { name: "Entertainment", count: 24 },
    { name: "Technology", count: 19 },
    { name: "Health", count: 15 }
  ];

  return (
    <aside className="space-y-6">
      {/* Trending News */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
        </div>
        <ul className="space-y-3">
          {trendingNews.map((news, index) => (
            <li key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors text-sm">
                {news}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-red-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Categories</h3>
        </div>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                {category.name}
              </a>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Advertisement Placeholder */}
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-500 mb-2">Advertisement</p>
        <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
          <span className="text-gray-400">Ad Space</span>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-red-600 text-white rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
        <p className="text-sm mb-4">Get the latest news delivered to your inbox</p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-3 py-2 rounded text-gray-900 focus:outline-none"
          />
          <button className="w-full bg-white text-red-600 py-2 rounded font-semibold hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;