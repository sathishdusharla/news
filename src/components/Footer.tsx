import React from 'react';
import { Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 md:space-x-6 mb-4 md:mb-6">
          <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
            <Facebook className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
            <Twitter className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
            <Instagram className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href="#" className="text-green-500 hover:text-green-400 transition-colors">
            <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-1 md:space-y-2">
          <p className="text-xs md:text-sm">
            Copyright (c) flashindianews All Rights Reserved
          </p>
          <p className="text-xs md:text-sm">
            Developed By SSIT 8143363500
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;