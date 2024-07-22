import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import ErrorMessage from '../ErrorMessage';

interface Step4Props {
  nextStep: () => void;
  prevStep: () => void;
  handleInputChange: (input: string, value: string) => void;
  formData: any;
}

const Step4: React.FC<Step4Props> = ({ nextStep, prevStep, handleInputChange, formData }) => {
  const [error, setError] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);

  const handleNextStep = () => {
    if (!formData.security_question || !formData.security_answer) {
      setError('Security question & answer fields are required');
    } else {
      setError('');
      nextStep();
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        handleInputChange('profile_picture_url', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-full bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Step 4: Security Information</h1>
        <form>
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24">
              {profilePicture ? (
                <img
                  src={profilePicture as string}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <div className="rounded-full w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  <FaCamera size={24} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfilePictureChange}
              />
            </div>
            <label className="text-gray-600 mt-2">Choose Profile Photo</label>
          </div>
          <select
            value={formData.security_question}
            onChange={(e) => handleInputChange('security_question', e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            required
          >
            <option value="" disabled>Security Question</option>
            <option value="What is your mother’s maiden name?">What is your mother’s maiden name?</option>
            <option value="What was the name of your first pet?">What was the name of your first pet?</option>
            <option value="What was the make of your first car?">What was the make of your first car?</option>
            <option value="What is your favorite color?">What is your favorite color?</option>
            <option value="What city were you born in?">What city were you born in?</option>
          </select>
          <input
            type="text"
            value={formData.security_answer}
            onChange={(e) => handleInputChange('security_answer', e.target.value)}
            placeholder="Security Answer"
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
              className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4;
