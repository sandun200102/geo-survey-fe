import React from 'react';

const PostCard = ({ title, image, description, onViewMore, onHire }) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <button 
            onClick={onViewMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
          >
            View More
          </button>
          <button 
            onClick={onHire}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
          >
            Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
