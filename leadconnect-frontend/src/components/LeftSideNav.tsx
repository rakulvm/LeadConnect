import React, { useState } from 'react';
import { FaSun, FaUserFriends, FaPhone, FaRegCreditCard,FaClock, FaStickyNote, FaNetworkWired, FaSort, FaPlus, FaTrash, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LeftSideNav = () => {
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await fetch('http://127.0.0.1:5000/api/users/logout', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        alert(data.message || 'Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out', error);
      alert('Error logging out');
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handlePricingTable = () => {
    navigate('/pricingTable');
  };
  return (
    <div className='top-0 left-0 w-1/6 h-screen bg-cardWhite p-5 flex flex-col mr-[0.2rem]'>
      <div className='flex items-center mb-4'>
        <div className='bg-buttonBlue h-10 w-10 flex items-center justify-center rounded-lg'>
          <img src='/src/assets/logo.jpg' alt='Logo' className='w-8' />
        </div>
        <span className='ml-4 text-xl font-bold color-secondaryTextColor'>Lead Connect</span>
      </div>
      <nav className='flex-shrink-0 space-y-2 opacity-75'>
        <Link to="/main" className='flex items-center color-secondaryTextColor hover:bg-highlightBlue hover:text-buttonBlue px-2 py-1 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-l'><FaSun /></span> <span className='ml-2 text-lg font-medium'>Dashboard</span>
        </Link>
        {/* <Link to="/contacts" className='flex items-center color-secondaryTextColor hover:bg-highlightBlue hover:text-buttonBlue px-2 py-1 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-l'><FaUserFriends /></span> <span className='ml-2 text-lg font-medium'>Contacts</span>
        </Link> */}
        <Link to="/keepintouch" className='flex items-center color-secondaryTextColor hover:bg-highlightBlue hover:text-buttonBlue px-2 py-1 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-l'><FaPhone /></span><span className='ml-2 text-lg font-medium'>Keep-in-touch</span>
        </Link>
        {/* <Link to="/notes" className='flex items-center color-secondaryTextColor hover:bg-highlightBlue hover:text-buttonBlue px-2 py-1 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-l'><FaStickyNote /></span>  <span className='ml-2 text-lg font-medium'>Notes</span>
        </Link> */}
        {/* <Link to="/timeline" className='flex items-center color-secondaryTextColor hover:bg-highlightBlue hover:text-buttonBlue px-2 py-1 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-l'><FaClock /></span> <span className='ml-2 text-lg font-medium'>Timeline</span>
        </Link> */}
        {/* <Link to="/network" className='flex items-center color-secondaryTextColor hover:bg-highlightBlue hover:text-buttonBlue px-2 py-1 rounded-lg transition duration-300 ease-in-out'>
          <span className='text-l'><FaNetworkWired /></span> <span className='ml-2 text-lg font-medium'>Network</span>
        </Link> */}
      </nav>

      <button
        onClick={handleProfile}
        style={{marginTop:'370px'}}
        className='mt-2 mb-2 bg-white text-gray-500 border border-gray-500 px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-500 hover:text-white'
      >
        <FaUser className='mr-2' /> Profile
      </button>
      <button
        onClick={handlePricingTable}
        className='mt-2 mb-2 bg-white text-gray-500 border border-gray-500 px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-500 hover:text-white'
      >
        <FaRegCreditCard className='mr-2' /> Subscription
      </button>
      <button
        onClick={handleLogout}
        className='mt-2 bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'
      >
        <FaSignOutAlt className='mr-2' /> Logout
      </button>
    </div>
  );
}

export default LeftSideNav;
