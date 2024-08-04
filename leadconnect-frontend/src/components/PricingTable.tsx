import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import ErrorMessage from './ErrorMessage';
interface FormData {
  subscription: string; // Added this field
}

interface FormData {
  subscription: string; // Added this field
}

const PricingTable: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ subscription: '' });
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch user subscription data from the backend
    fetch('http://127.0.0.1:5000/api/users/profile', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user subscription data.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Debug log
        // Ensure that the subscription key is defined
        setFormData({ subscription: data.subscription });
      })
      .catch((error) => {
        console.error('Error fetching subscription data:', error); // Debug log
        setError('Failed to load user subscription data. Error: ' + error.toString());
      });
  }, []);

  // Logging the current state of formData
  useEffect(() => {
    console.log('Current subscription:', formData.subscription); // Debug log
  }, [formData.subscription]);

  const handleUpgrade = (newSubscription: string) => {
    console.log('Upgrading to:', newSubscription); // Debug log
    // Update subscription in the backend
    fetch('http://127.0.0.1:5000/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ subscription: newSubscription }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update subscription.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Updated subscription:', data); // Debug log
        // Update local state with the new subscription
        setFormData({ subscription: newSubscription });
        navigate('/paymentForm');
      })
      .catch((error) => {
        console.error('Error updating subscription:', error); // Debug log
        setError('Failed to update subscription. Error: ' + error.toString());
      });
  };


  const currentPlan = formData.subscription;
  console.log('Current plan:', currentPlan); // Debug log
    return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Standard Plan */}
        <div className="bg-cardWhite border rounded-lg p-6">
          <div className="text-xl font-bold">Free Tier</div>
          <div className="text-3xl font-bold mt-4">$0 <span className="text-lg font-normal">/user/mo</span></div>
          <div className="text-sm text-gray-500">1 User</div>
          <div className="mt-4 flex space-x-2">
            <button onClick={() => handleUpgrade('Free Tier')}className='mt-auto bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'>{currentPlan === 'Free Tier' ? 'Current Plan' : 'Switch'}</button>
          </div>
          <ul className="mt-4 space-y-2">
            <li>✓ 5 Sync profiles per week</li>
            <li>✓ Limited LLM chat</li>
            <li>✓ limited reminders</li>
            <li>✓ 1 user</li>
          </ul>
        </div>
        <div className="bg-cardWhite border-2 border-blue-600 rounded-lg p-6">
          <div className="text-xl font-bold">Business Tier</div>
          <div className="text-3xl font-bold mt-4">$20 <span className="text-lg font-normal">/user/mo</span></div>
          <div className="text-sm text-gray-500">5 Users</div>
          <div className="mt-4 flex space-x-2">
          <button onClick={() => handleUpgrade("Business Tier")} className='mt-auto bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'>{currentPlan === 'Business Tier' ? 'Current Plan' : 'Switch'}</button>
          </div>
          <ul className="mt-4 space-y-2">
            <li>✓ 50 sync profiles a week </li>
            <li>✓ proactive notification and reminders</li>
            <li>✓ intermediate skilled LLM with latest GPT support</li>
          </ul>
        </div>
        <div className="bg-cardWhite border rounded-lg p-6">
          <div className="text-xl font-bold">Enterprise Tier</div>
          <div className="text-3xl font-bold mt-4">$100 <span className="text-lg font-normal">/user/mo</span></div>
          <div className="text-sm text-gray-500">20 Users</div>
          <div className="mt-4 flex space-x-2">
          <button onClick={() => handleUpgrade('Enterprise Tier')} className='mt-auto bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'>{currentPlan === 'Enterprise Tier' ? 'Current Plan' : 'Switch'}</button>
          </div>
          <ul className="mt-4 space-y-2">
            <li>✓ Custom training to LLM chat with notes and user profiles proactively</li>
            <li>✓ unlimited syncs</li>
            <li>✓ 20 users</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
