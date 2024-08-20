"use client";

import React from 'react';
import Image from 'next/image';
import Search from '../../public/assets/search.png'; // Adjust the path as needed

const SearchField: React.FC = () => {
  return (
    <div className="relative flex items-center group">
      {/* Wrapper for the input and icon */}
      <div className="flex items-center">
        {/* Input field */}
        <input
          type="text"
          placeholder="Search..."
          className="transition-all duration-300 ease-in-out bg-white border border-gray-300 text-gray-700 py-1 px-4 leading-tight w-0 opacity-0 group-hover:w-48 group-hover:opacity-100 rounded-full"
          style={{ minWidth: '120px' }} // Ensure the input field has a minimum width
        />
        {/* Search icon */}
        <button className="flex items-center ml-2 focus:outline-none">
          <Image src={Search} alt="Search" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SearchField;
