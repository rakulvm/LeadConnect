import React from 'react';
import { FaTimes } from 'react-icons/fa';
import notesBanner from '../assets/notes.png'; // Adjust the path if necessary

interface NotesPopupProps {
  contactName: string;
  onClose: () => void;
}

const NotesPopup: React.FC<NotesPopupProps> = ({ contactName, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl h-3/4 relative z-10 overflow-y-auto'>
        {/* Header with close button */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Notes for {contactName}</h2>
          <button className='text-gray-600 hover:text-gray-800' onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className='relative w-full h-24 mb-4'>
          <img src={notesBanner} alt='Banner' className='w-full h-full object-cover rounded-lg' />
        </div>

        <textarea className='w-full h-2/3 p-2 border rounded-md mb-4' placeholder='Write your notes here...'></textarea>

        <div className='flex justify-between'>
          <button className='px-4 py-2 rounded-lg bg-gray-500 text-white border-transparent transition duration-300' onClick={onClose}>Cancel</button>
          <button className='px-4 py-2 rounded-lg bg-blue-500 text-white border-transparent transition duration-300'>Save</button>
        </div>
      </div>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
    </div>
  );
}

export default NotesPopup;
