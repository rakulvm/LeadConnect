import React, { useState } from 'react';
import Modal from 'react-modal';

type Contact = {
  name: string;
  role: string;
  frequency: string;
  date: string;
};

type ContactModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  addContact: (contact: Contact) => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onRequestClose, addContact }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [frequency, setFrequency] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && role && frequency && date) {
      addContact({ name, role, frequency, date });
      setName('');
      setRole('');
      setFrequency('');
      setDate('');
      onRequestClose();
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Contact"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <form onSubmit={handleSubmit} className="bg-cardWhite p-4 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">Name</label>
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">Role</label>
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">Frequency</label>
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">Date</label>
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-buttonBlue text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-600 w-full"
        >
          Add Contact
        </button>
      </form>
    </Modal>
  );
};

export default ContactModal;
