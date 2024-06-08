import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';

interface Step1Props {
  nextStep: () => void;
  handleInputChange: (input: string, value: string) => void;
  formData: any;
}

const Step1: React.FC<Step1Props> = ({ nextStep, handleInputChange, formData }) => {
  const [error, setError] = useState<string>('');

  const validateUsername = (username: string): string | null => {
    if (username.length < 8) {
      return 'Username must be at least 8 characters long';
    }
    if (/[^a-zA-Z0-9_]/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/^[a-zA-Z]/.test(password)) {
      return 'Password must start with a letter';
    }
    return null;
  };

  const handleNextStep = () => {
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
    } else if (usernameError) {
      setError(usernameError);
    } else if (passwordError) {
      setError(passwordError);
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Step 1: Account Details</h1>
        <form>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder="Username"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Password"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm Password"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          {error && <ErrorMessage message={error} />}
          <button
            type="button"
            onClick={handleNextStep}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full mt-4"
          >
            Next
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Step1;
