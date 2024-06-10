import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage';

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  handleInputChange: (input: string, value: string) => void;
  formData: any;
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep, handleInputChange, formData }) => {
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const re = /^[0-9]{10}$/;
    return re.test(phoneNumber);
  };

  const handleNextStep = () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_number) {
      setError('All fields are required');
    } else if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
    } else if (!validatePhoneNumber(formData.phone_number)) {
      setError('Please enter a valid 10-digit phone number');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <div className="min-h-full bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Step 2: Personal Information</h1>
        <form>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
            placeholder="First Name"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            placeholder="Last Name"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            value={formData.phone_number}
            onChange={(e) => handleInputChange('phone_number', e.target.value)}
            placeholder="Phone Number"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Email"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          {error && <ErrorMessage message={error} />}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 "
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step2;
