import React, { useState } from 'react';
import { FaSort, FaFilter, FaStickyNote, FaLinkedin, FaFacebook, FaTwitter, FaSearch } from 'react-icons/fa';
import ContactModal from './AddContact'; // Adjust the path according to your folder structure
import NotesPopup from './NotesPopup'; // Adjust the path according to your folder structure

type Contact = {
  name: string;
  role: string;
  frequency: string;
  date: string;
};

const MainTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { name: 'Sundhar K', role: 'Developer', frequency: 'Every 2 weeks', date: 'jul 5' },
    { name: 'Sarvan', role: 'Mentor', frequency: 'Don\'t keep in touch', date: 'jul 5' },
    { name: 'Rathinas', role: 'Actor', frequency: 'Every week', date: 'jul 5' },
    { name: 'Rakul', role: 'DevOps Engineer', frequency: 'Every month', date: 'jul 5' },
    { name: 'Hayden', role: 'Full Stack Developer', frequency: 'Every week', date: 'jul 5' },
    { name: 'Jivin', role: 'Backend Engineer', frequency: 'Every 6 months', date: 'jul 5' },
    // Add more contacts here if needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const handleNotesClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="h-[89%] p-2 bg-white flex flex-col">
      <div className="ml-4 mr-3 flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl opacity-75 font-bold color-secondaryTextColor">All contacts</h2>
          <p className="text-lg color-secondaryTextColor">{contacts.length} total contacts</p>
        </div>
        <button
          className="bg-buttonBlue text-cardWhite px-3 py-2 rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          + Add new contact
        </button>
      </div>
      <ContactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} addContact={addContact} />
      <div className="flex justify-between items-center p-1 rounded-lg">
        <div className="ml-3 flex items-center space-x-4">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-buttonBlue" />
          <span className="text-lg opacity-85 color-secondaryTextColor">Select all</span>
        </div>
        <div className="flex items-center space-x-9">
          <button className="bg-cardWhite opacity-85 color-secondaryTextColor px-4 py-2 rounded-lg border-slate-200 border-[1px] hover:bg-gray-300">
            Properties
          </button>
          <button className="bg-cardWhite opacity-85 color-secondaryTextColor px-4 py-2 rounded-lg flex items-center border-slate-200 border-[1px] hover:bg-gray-300">
            <span className="mr-2"><FaSort /></span> Sort
          </button>
          <button className="bg-cardWhite opacity-85 color-secondaryTextColor px-4 py-2 rounded-lg flex items-center border-slate-200 border-[1px] hover:bg-gray-300">
            <span className="mr-2 "><FaFilter/></span> Filter
          </button>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search contact..."
              className="border border-gray-300 pl-10 pr-6 py-2 rounded-lg shadow-lg opacity-55 bg-searchBarBackground"
            />
          </div>
        </div>
      </div>

      <div className="bg-cardWhite overflow-y-auto scrollbar-thin">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center mr-4 p-0.5 pt-2 pb-2 border-slate-100	border-y-[1px] hover:bg-highlightBlue hover:border-l-blue-400 hover:border-l-4">
            <div className="flex items-center pl-4 w-[8%]">
              <input type="checkbox" className="form-checkbox h-4 w-4  text-buttonBlue" />
              <img src="https://media.licdn.com/dms/image/D5603AQHCl6rE29FjDQ/profile-displayphoto-shrink_400_400/0/1700181003703?e=1722470400&v=beta&t=JXh72hidUVebdLR2JrDBMXbG9HC1FT9LCuBHuPUS0i4" alt="profile" className="ml-4 w-8 h-8 rounded-full" />
            </div>
              <div className="flex w-[32%]">
                <p className="font-semibold text-lg opacity-80">{contact.name}</p>
                <p className="text-lg opacity-60 ml-3">{contact.role}</p>
              </div>
              <span className="text-lg opacity-80 w-[25%]">{contact.frequency}</span>
            <div className="flex items-center justify-evenly pr-2 w-[20%]">
              <button onClick={() => handleNotesClick(contact)} className="bg-highlightBlue text-buttonBlue px-2 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaStickyNote/></span>
              </button>
              <button onClick={() => alert(`You clicked on the LinkedIn icon for ${contact.name}!`)} className="bg-highlightBlue text-buttonBlue px-2 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaLinkedin/></span>
              </button>
              <button onClick={() => alert(`You clicked on the Facebook icon for ${contact.name}!`)} className="bg-highlightBlue text-buttonBlue px-2 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaFacebook/></span>
              </button>
              <button onClick={() => alert(`You clicked on the Twitter icon for ${contact.name}!`)} className="bg-highlightBlue text-buttonBlue px-2 py-2 rounded-full transition duration-300 ease-in-out">
                <span className="text-buttonBlue hover:text-blue-700"><FaTwitter/></span>
              </button>
            </div>
              <span className="text-lg opacity-60 text-right pr-2 w-[15%]">{contact.date}</span>
          </div>
        ))}
      </div>
      {selectedContact && <NotesPopup contactName={selectedContact.name} onClose={() => setSelectedContact(null)} />}
    </div>
  );
};

export default MainTable;
