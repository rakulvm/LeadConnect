import React, { useState } from 'react';
import { FaSun, FaUserFriends, FaPhone, FaClock, FaBolt, FaTools, FaMapMarkerAlt, FaNetworkWired, FaSort, FaPlus, FaTrash } from 'react-icons/fa';

const LeftSideNav = () => {
  const [groups, setGroups] = useState([
    { name: 'Sports', value: 8, emoji: '⚽' },
    { name: 'Friends', value: 5, emoji: '👫' },
    { name: 'Video', value: 8, emoji: '🎥' },
    { name: 'Network', value: 10, emoji: '🌐' },
  ]);

  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const handleSort = () => {
    const sortedGroups = [...groups].sort((a, b) => {
      return isSortedAsc ? a.value - b.value : b.value - a.value;
    });
    setGroups(sortedGroups);
    setIsSortedAsc(!isSortedAsc);
  };

  const handleAddGroup = () => {
    const name = prompt('Enter the group name:');
    if (name !== null) {
      const value = prompt('Enter the group value:');
      const emoji = prompt('Enter an emoji for the group:');
      if (value !== null && !isNaN(parseInt(value, 10)) && emoji !== null) {
        const newGroup = {
          name,
          value: parseInt(value, 10),
          emoji,
        };
        setGroups([...groups, newGroup]);
      } else {
        alert('Invalid input. Please enter valid values for name, value, and emoji.');
      }
    } else {
      alert('Invalid input. Please enter a valid name.');
    }
  };

  const handleDeleteGroup = () => {
    const name = prompt('Enter the name of the group to delete:');
    if (name !== null) {
      const updatedGroups = groups.filter(group => group.name !== name);
      if (updatedGroups.length === groups.length) {
        alert('Group not found.');
      } else {
        setGroups(updatedGroups);
      }
    } else {
      alert('Invalid input. Please enter a valid name.');
    }
  };

  return (
    <div className='h-screen w-1/6 bg-backgroundColor p-4 shadow-lg'>
      <div className='flex items-center mb-12'>
        <div className='bg-buttonBlue h-14 w-14 flex items-center justify-center rounded-lg'>
          <img src='/src/assets/logo.jpg' alt='Logo' className='w-10' />
        </div>
        <span className='ml-5 text-3xl font-bold text-gray-700'>Lead Connect</span>
      </div>
      <nav className='space-y-2'>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaSun /></span> <span className='ml-4 text-xl font-medium'>Today</span>
        </a>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaUserFriends /></span> <span className='ml-4 text-xl font-medium'>Contacts</span>
        </a>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaPhone /></span><span className='ml-4 text-xl font-medium'>Keep-in-touch</span>
        </a>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaBolt /></span>  <span className='ml-4 text-xl font-medium'>Quick action</span>
        </a>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaTools /></span> <span className='ml-4 text-xl font-medium'>Merge and fix</span>
        </a>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaMapMarkerAlt /></span>  <span className='ml-4 text-xl font-medium'>Location</span>
        </a>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaClock /></span> <span className='ml-4 text-xl font-medium'>Timeline</span>
        </a>
        <a href='#' className='flex items-center text-gray-700 hover:bg-highlightBlue hover:text-buttonBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-lg'><FaNetworkWired /></span> <span className='ml-4 text-xl font-medium'>Network</span>
        </a>
      </nav>

      <div className='mt-12'>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-500 text-lg font-bold'>GROUPS</h3>
          <div className='flex items-center space-x-4'>
            <span className='text-gray-500 cursor-pointer' onClick={handleSort}><FaSort /></span>
            <span className='text-gray-500 cursor-pointer' onClick={handleAddGroup}><FaPlus /></span>
            <span className='text-gray-500 cursor-pointer' onClick={handleDeleteGroup}><FaTrash /></span>
          </div>
        </div>
        <div className='space-y-2 mt-2'>
          {groups.map(group => (
            <div key={group.name} className='text-xg font-medium flex justify-between text-gray-700 items-center hover:bg-highlightBlue px-3 py-2 rounded-lg transition duration-300 ease-in-out'>
              <span className='flex items-center'>
                <span className='mr-3'>{group.emoji}</span>
                {group.name}
              </span>
              <span>{group.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSideNav;
