
// components/GrantList.js
import React from 'react';

export default function GrantList({ grants }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {grants.map((grant: any, index: any) => (
        <div key={index} className="p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-bold mb-2">{grant.Name}</h3>
          <p className="text-gray-700">{grant.Brief}</p>
          <p className="text-gray-500 text-sm mt-2">{grant.Industry}</p>
          <a
            href={grant["Links to application"]}
            target="_blank"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
}
