import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage';

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
  handleInputChange: (input: string, value: string) => void;
  formData: any;
}

const Step3: React.FC<Step3Props> = ({ nextStep, prevStep, handleInputChange, formData }) => {
  const [error, setError] = useState<string>('');

  const handleNextStep = () => {
    if (!formData.company || !formData.number_of_employees || !formData.province) {
      setError('All fields are required');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <div className="min-h-full bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Step 3: Company Information</h1>
        <form>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Company"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <select
            value={formData.number_of_employees}
            onChange={(e) => handleInputChange('number_of_employees', e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            required
          >
            <option value="" disabled>Number of Employees</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1001-5000">1001-5000</option>
            <option value="5001-10000">5001-10000</option>
            <option value="10001+">10001+</option>
          </select>
          <select
            value={formData.province}
            onChange={(e) => handleInputChange('province', e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            required
          >
            <option value="" disabled>Province</option>
            <option value="Alberta">Alberta</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Manitoba">Manitoba</option>
            <option value="New Brunswick">New Brunswick</option>
            <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="Ontario">Ontario</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Quebec">Quebec</option>
            <option value="Saskatchewan">Saskatchewan</option>
          </select>
          {error && <ErrorMessage message={error} />}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3;
