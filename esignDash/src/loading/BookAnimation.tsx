import React from 'react';

const BookAnimation: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#ffffff]">
          <div className="relative w-20 h-12">
            <p className="absolute top-0 m-0 text-[#283d43] font-bold text-xs tracking-widest animate-loading-text">
              loading
            </p>
            <span className="absolute bottom-0 w-4 h-4 bg-[#1d2c30] rounded-full transform translate-x-16 animate-loading-ball">
              <span className="absolute w-full h-full bg-[#6f9ca9] rounded-full animate-loading-ball-inner"></span>
            </span>
          </div>
        </div>
      );
};

export default BookAnimation;
