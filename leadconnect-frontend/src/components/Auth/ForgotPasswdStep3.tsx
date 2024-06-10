import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';

interface Step3Props {
  onBack: () => void;
  email: string;
  securityAnswer: string;
}

const Step3: React.FC<Step3Props> = ({ onBack, email, securityAnswer }) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!password) {
      setError('Password is required');
    } else if (password !== repeatPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Save password logic
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 3: Reset Your Password</h2>
      {error && <ErrorMessage message={error} />}
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <input
        type="password"
        placeholder="Repeat New Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <div className="flex justify-between">
        <button onClick={onBack} className="bg-secondaryTextColor text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
        <button onClick={handleSave} className="bg-buttonBlue text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
      </div>
    </div>
  );
};

export default Step3;
