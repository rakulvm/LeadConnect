import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { BiSolidDownArrow  } from "react-icons/bi";


export default function TopNav() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className='bg-white shadow h-[8%] flex items-center justify-between px-4 py-4'>
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
          className="ml-2 p-2 bg-searchBarBackground rounded-full hover:bg-gray-300 focus:outline-none" style={{ color: "#767B86" }}
        >
          <FaPlus />
        </button>
        <button
          className="ml-2 p-2 bg-searchBarBackground text-gray-10 0 rounded-full hover:bg-gray-300 focus:outline-none" style={{ color: "#767B86" }}
        >
          <BiSolidDownArrow  />
        </button>
      </div>
    </div>
  );
}
