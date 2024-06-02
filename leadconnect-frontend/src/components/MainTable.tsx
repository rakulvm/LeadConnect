import React from 'react';
import { FaSort, FaFilter, FaEnvelope, FaLinkedin, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const MainTable = () => {
  const contacts = [
    { name: 'Sundhar K', role: 'Developer', frequency: 'Every 2 weeks', date: 'jul 5' },
    { name: 'Sarvan', role: 'Mentor', frequency: 'Don\'t keep in touch', date: 'jul 5' },
    { name: 'Rathinas', role: 'Actor', frequency: 'Every week', date: 'jul 5' },
    { name: 'Rakul', role: 'DevOps Engineer', frequency: 'Every month', date: 'jul 5' },
    { name: 'Hayden', role: 'Full Stack Developer', frequency: 'Every week', date: 'jul 5' },
    { name: 'Jivin', role: 'Backend Engineer', frequency: 'Every 6 months', date: 'jul 5' },
  ];

  const handleIconClick = (icon: string) => {
    alert(`You clicked on the ${icon} icon!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">All contacts</h2>
          <p className="text-lg text-gray-600">{contacts.length} total contacts</p>
        </div>
        <button className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-600">+ Add new contact</button>
      </div>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
          <span className="text-lg text-gray-700">Select all</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-300">Properties</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-lg flex items-center hover:bg-gray-300">
            <span className="mr-2"><FaSort /></span> Sort
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-lg flex items-center hover:bg-gray-300">
            <span className="mr-2"><FaFilter /></span> Filter
          </button>
          <input type="text" placeholder="Search contact..." className="border border-gray-300 px-4 py-2 rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {contacts.map((contact, index) => (
          <div key={index} className="flex justify-between items-center m-8 p-4 hover:bg-gray-50">
            <div className="flex items-center space-x-16">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
              <img src="https://via.placeholder.com/40" alt="profile" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold text-2xl text-gray-800">{contact.name}</p>
                <p className="text-lg text-gray-500">{contact.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-16">
              <span className="text-2xl text-gray-700 m-5">{contact.frequency}</span>
              <button onClick={() => handleIconClick('email')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out">
                <span className="text-blue-500 hover:text-blue-700"><FaEnvelope/></span>
              </button>
              <button onClick={() => handleIconClick('LinkedIn')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out">
                <span className="text-blue-500 hover:text-blue-700"><FaLinkedin/></span>
              </button>
              <button onClick={() => handleIconClick('Facebook')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out">
                <span className="text-blue-500 hover:text-blue-700"><FaFacebook/></span>
              </button>
              <button onClick={() => handleIconClick('Twitter')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out">
                <span className="text-blue-500 hover:text-blue-700"><FaTwitter/></span>
              </button>
              <span className="text-lg text-gray-500 ml-8">{contact.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainTable;
