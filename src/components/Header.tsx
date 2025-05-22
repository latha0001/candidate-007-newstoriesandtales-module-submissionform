import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#8E24AA] to-[#9C27B0] text-white shadow-md">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={28} className="text-[#FFB300]" />
          <h1 className="text-2xl font-display font-bold">NewStories & Tales</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li className="hover:text-[#FFB300] transition-colors duration-200">Home</li>
            <li className="hover:text-[#FFB300] transition-colors duration-200">Discover</li>
            <li className="relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-[#FFB300] text-[#FFB300]">Submit</li>
            <li className="hover:text-[#FFB300] transition-colors duration-200">About</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;