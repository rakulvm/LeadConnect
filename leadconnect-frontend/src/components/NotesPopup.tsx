import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import notesBanner from '../assets/notes.png'; // Adjust the path if necessary

interface NotesPopupProps {
  contactName: string;
  notes: string;
  onClose: () => void;
  onSave: () => void;
  onNoteChange: (contact_url: string, newNote: string) => void;
}

const NotesPopup: React.FC<NotesPopupProps> = ({ contactName, notes, onClose, onSave, onNoteChange }) => {
  const [noteContent, setNoteContent] = useState(notes);

  useEffect(() => {
    setNoteContent(notes);
  }, [notes]);

  const handleSave = () => {
    onNoteChange(contactName, noteContent);
    onSave();
    onClose();
  };

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

        <textarea
          className='w-full h-2/3 p-2 border rounded-md mb-4'
          placeholder='Write your notes here...'
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        ></textarea>

        <div className='flex justify-between'>
          <button className='px-4 py-2 rounded-lg bg-gray-500 text-white border-transparent transition duration-300' onClick={onClose}>Cancel</button>
          <button className='px-4 py-2 rounded-lg bg-blue-500 text-white border-transparent transition duration-300' onClick={handleSave}>Save</button>
        </div>
      </div>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
    </div>
  );
};

export default NotesPopup;
