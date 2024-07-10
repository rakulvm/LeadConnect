import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingTable: React.FC = () => {
    const navigate = useNavigate();
    const handleUpgrade = () => {
        navigate('/paymentForm');
      };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Standard Plan */}
        <div className="bg-cardWhite border rounded-lg p-6">
          <div className="text-xl font-bold">Free Tier</div>
          <div className="text-3xl font-bold mt-4">$0 <span className="text-lg font-normal">/user/mo</span></div>
          <div className="text-sm text-gray-500">1 User</div>
          <div className="mt-4 flex space-x-2">
            <button className='mt-auto bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'>Upgrade</button>
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
          <button onClick={handleUpgrade} className='mt-auto bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'>Upgrade</button>
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
          <button onClick={handleUpgrade} className='mt-auto bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'>Upgrade</button>
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
