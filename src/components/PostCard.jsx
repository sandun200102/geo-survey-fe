import React from 'react';

const PostCard = ({ title, image, description, onViewMore, onHire }) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl group">
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          src={image}
          alt={title}
        />
        <div className="absolute top-2 right-2 bg-white/70 backdrop-blur-md text-xs px-2 py-1 rounded-full text-gray-700 shadow-sm">
          Featured
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-blue-600">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={onViewMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow hover:shadow-md"
          >
            View More
          </button>
          <button
            onClick={onHire}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow hover:shadow-md"
          >
            Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
