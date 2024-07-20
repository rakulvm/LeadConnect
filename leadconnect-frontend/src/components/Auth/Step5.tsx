import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage';

interface Step5Props {
  prevStep: () => void;
  handleInputChange: (input: string, value: string) => void;
  formData: any;
  handleSubmit: () => void;
}

const Step5: React.FC<Step5Props> = ({ prevStep, handleInputChange, formData, handleSubmit }) => {
  const [error, setError] = useState<string>('');

  const handleNextStep = () => {
    if (!formData.my_resume_content) {
      setError('Resume content is required');
    } else {
      setError('');
      handleSubmit();
    }
  };

  return (
    <div className="min-h-full bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Step 5: Add Resume Content</h1>
        <form>
          <textarea
            value={formData.my_resume_content}
            onChange={(e) => handleInputChange('my_resume_content', e.target.value)}
            placeholder="Paste your resume content here..."
            className="mb-4 p-2 border rounded w-full h-48"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step5;
