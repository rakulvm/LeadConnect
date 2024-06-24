import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import notesBanner from '../assets/notes.png';

interface NotesPopupProps {
  contactName: string;
  contactUrl: string;
  initialNote: string;
  token: string | null;
  onClose: () => void;
}

const NotesPopup: React.FC<NotesPopupProps> = ({ contactName, contactUrl, initialNote, token, onClose }) => {
  const [note, setNote] = useState(initialNote);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  const handleSave = async () => {
    if (!token) {
      alert('Authorization token is missing');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/contacts/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ contact_url: contactUrl, notes: note }),
      });
      if (!response.ok) {
        throw new Error('Failed to save notes');
      }
      onClose(); // Close the popup after saving
    } catch (err: unknown) {
      alert(`Error saving notes: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleEdit = async () => {
    if (!token) {
      alert('Authorization token is missing');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/contacts/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ contact_url: contactUrl, notes: note }),
      });
      if (!response.ok) {
        throw new Error('Failed to edit notes');
      }
      setIsEditing(false); // Exit editing mode after saving
      onClose(); // Close the popup after editing
    } catch (err: unknown) {
      alert(`Error editing notes: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl h-3/4 relative z-10 overflow-y-auto'>
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
          value={note || ''} // Ensure value is not null
          onChange={(e) => setNote(e.target.value)}
          readOnly={!isEditing}
        ></textarea>

        <div className='flex justify-between'>
          <button className='px-4 py-2 rounded-lg bg-gray-500 text-white border-transparent transition duration-300' onClick={onClose}>Cancel</button>
          {isEditing ? (
            <button className='px-4 py-2 rounded-lg bg-blue-500 text-white border-transparent transition duration-300' onClick={handleEdit}>Save</button>
          ) : (
            <button className='px-4 py-2 rounded-lg bg-yellow-500 text-white border-transparent transition duration-300' onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
    </div>
  );
};

export default NotesPopup;
