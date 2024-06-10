import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { BiSolidDownArrow } from 'react-icons/bi';

export default function TopNav() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='bg-white h-[10%] flex items-center justify-between px-6 py-4 mb-[0.2rem]'>
      <div className="flex items-center bg-searchBarBackground rounded-md p-0 w-1/2">
        <FaSearch className="ml-4" style={{ color: "#A0AEC0" }} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search"
          className="flex-grow px-4 py-2 bg-searchBarBackground text-gray-400 rounded-md focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <button
          className="ml-2 p-2 bg-searchBarBackground rounded-full text-iconColor hover:bg-hoverIconColor focus:outline-none"
        >
          <FaPlus />
        </button>
        <button
          className="ml-2 p-2 bg-searchBarBackground rounded-full text-iconColor hover:bg-hoverIconColor focus:outline-none"
        >
          <BiSolidDownArrow />
        </button>
      </div>
    </div>
  );
}
