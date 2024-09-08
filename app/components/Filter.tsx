"use client";
import React, { useState } from 'react';

export default function Filter({ onFilter }: any) {
  const [industry, setIndustry] = useState('');

  const handleFilter = () => {
    onFilter(industry);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white transition-colors duration-300">Filter Grants</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-300">
          Industry
        </label>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-black dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Enter industry"
        />
      </div>
      
      <button
        onClick={handleFilter}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 transform hover:scale-105"
      >
        Filter Grants
      </button>
    </div>
  );
}
