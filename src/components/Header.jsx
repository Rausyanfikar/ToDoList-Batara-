import { Link } from 'react-router-dom';
import React from 'react';

export const Header = () => {
  return (
    <nav className="bg-[#16ABF8] w-full flex justify-center">
      <div className="w-full max-w-4xl p-8 text-white font-bold">
        <Link to="/">
          <div className=" cursor-pointer text-xl ">TO DO LIST APP</div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
