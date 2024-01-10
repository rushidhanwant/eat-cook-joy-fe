import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="border-t-4 border-gray-400 rounded-full animate-spin h-12 w-12"></div>
    </div>
  );
};

export default Loader;