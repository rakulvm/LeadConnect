import React, { useState } from 'react';
import { FaSort, FaFilter, FaEnvelope, FaLinkedin, FaFacebook, FaTwitter, FaSearch } from 'react-icons/fa';
import ContactModal from './AddContact'; // Adjust the path according to your folder structure

type Contact = {
  name: string;
  role: string;
  frequency: string;
  date: string;
};

const MainTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { name: 'Sundhar K', role: 'Developer', frequency: 'Every 2 weeks', date: 'jul 5' },
    { name: 'Sarvan', role: 'Mentor', frequency: 'Don\'t keep in touch', date: 'jun 5' },
    { name: 'Rathinas', role: 'Actor', frequency: 'Every week', date: 'jul 5' },
    { name: 'Rakul', role: 'DevOps Engineer', frequency: 'Every month', date: 'jan 5' },
    { name: 'Hayden', role: 'Full Stack Developer', frequency: 'Every week', date: 'may 5' },
    { name: 'Jivin', role: 'Backend Engineer', frequency: 'Every 6 months', date: 'dec 5' },
    // Add more contacts here if needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '',
    role: '',
    frequency: '',
    date: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const handleIconClick = (icon: string) => {
    alert(`You clicked on the ${icon} icon!`);
  };

  const handleSort = () => {
    const sortedContacts = [...contacts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setContacts(sortedContacts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filterValues.name.toLowerCase()) &&
      contact.role.toLowerCase().includes(filterValues.role.toLowerCase()) &&
      contact.frequency.toLowerCase().includes(filterValues.frequency.toLowerCase()) &&
      contact.date.toLowerCase().includes(filterValues.date.toLowerCase())
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchFilteredContacts = filteredContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen p-1 bg-backgroundColor flex flex-col relative">
      <div className="ml-4 mr-3 flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl opacity-75 font-bold color-secondaryTextColor">All contacts</h2>
          <p className="text-lg color-secondaryTextColor">{searchFilteredContacts.length} total contacts</p>
        </div>
        <button
          className="bg-buttonBlue text-cardWhite px-3 py-2 rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          + Add new contact
        </button>
      </div>
      <ContactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} addContact={addContact} />
      <div className="flex justify-between items-center bg-cardWhite p-1 rounded-lg mb-4 mr-16">
        <div className="ml-3 flex items-center space-x-4">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-buttonBlue" />
          <span className="text-lg opacity-85 color-secondaryTextColor">Select all</span>
        </div>
        <div className="flex items-center space-x-4 relative">
          <button className="bg-gray-200 opacity-85 color-secondaryTextColor px-4 py-2 rounded-lg shadow-lg hover:bg-gray-300">
            Properties
          </button>
          <button onClick={handleSort} className="bg-gray-200 opacity-85 color-secondaryTextColor px-4 py-2 rounded-lg shadow-lg flex items-center hover:bg-gray-300">
            <span className="mr-2"><FaSort /></span> Sort
          </button>
          <button
            onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
            className="bg-gray-200 opacity-85 color-secondaryTextColor px-4 py-2 rounded-lg shadow-lg flex items-center hover:bg-gray-300"
          >
            <span className="mr-2"><FaFilter /></span> Filter
          </button>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search contact..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 pl-10 pr-6 py-2 rounded-lg shadow-lg opacity-55 bg-searchBarBackground"
            />
          </div>
        </div>
      </div>

      {filterDropdownVisible && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setFilterDropdownVisible(false)}></div>
          <div className="relative bg-white w-64 h-full shadow-lg z-50 p-4">
            <h3 className="text-xl font-semibold mb-4">Filter Contacts</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Filter by name"
                value={filterValues.name}
                onChange={handleFilterChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="text"
                name="role"
                placeholder="Filter by role"
                value={filterValues.role}
                onChange={handleFilterChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="text"
                name="frequency"
                placeholder="Filter by frequency"
                value={filterValues.frequency}
                onChange={handleFilterChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="text"
                name="date"
                placeholder="Filter by date"
                value={filterValues.date}
                onChange={handleFilterChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <button
                onClick={() => setFilterDropdownVisible(false)}
                className="bg-buttonBlue text-cardWhite px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-cardWhite rounded-lg shadow-lg flex-grow overflow-y-auto scrollbar-thin">
        {searchFilteredContacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 m-4 p-0.5 hover:bg-highlightBlue items-center">
            <div className="col-span-5 flex items-center space-x-4">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-buttonBlue" />
              <img src="https://teams.microsoft.com/l/message/48:notes/1716240767333?context=%7B%22contextType%22%3A%22chat%22%7D" alt="profile" className="w-12 h-12 rounded-full" />
              <div className="flex items-center">
                <p className="font-semibold text-lg opacity-80">{contact.name}</p>
                <p className="text-lg opacity-60 ml-2">{contact.role}</p>
              </div>
            </div>
            <div className="col-span-3 text-lg opacity-80">{contact.frequency}</div>
            <div className="col-span-3 flex space-x-2">
              <button onClick={() => handleIconClick('email')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaEnvelope /></span>
              </button>
              <button onClick={() => handleIconClick('LinkedIn')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaLinkedin /></span>
              </button>
              <button onClick={() => handleIconClick('Facebook')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaFacebook /></span>
              </button>
              <button onClick={() => handleIconClick('Twitter')} className="bg-highlightBlue text-buttonBlue px-3 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaTwitter /></span>
              </button>
            </div>
            <div className="col-span-1 text-lg opacity-60">{contact.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainTable;
