import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';

interface Step1Props {
  onNext: () => void;
  email: string;
  setEmail: (email: string) => void;
}

const Step1: React.FC<Step1Props> = ({ onNext, email, setEmail }) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!email) {
      setError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
    } else {
      setError('');
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: Enter Your Email</h2>
      {error && <ErrorMessage message={error} />}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button onClick={handleNext} className="bg-buttonBlue text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
    </div>
  );
};

export default Step1;
