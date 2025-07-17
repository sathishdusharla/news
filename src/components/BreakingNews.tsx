import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const BreakingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const breakingNews = [
    "BREAKING: Supreme Court delivers landmark judgment on digital privacy rights",
    "LIVE: Parliament session begins with heated debate on economic reforms",
    "URGENT: Major earthquake hits northern region, rescue operations underway",
    "ALERT: Stock markets surge following positive GDP growth data"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <div className="bg-red-600 text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center bg-white text-red-600 px-4 py-1 rounded-full mr-4 flex-shrink-0">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span className="font-bold text-sm">BREAKING</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div 
              className="whitespace-nowrap transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {breakingNews.map((news, index) => (
                <span key={index} className="inline-block w-full">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;