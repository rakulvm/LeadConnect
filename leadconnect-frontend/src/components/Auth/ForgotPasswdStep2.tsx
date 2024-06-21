import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../components/ErrorMessage';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  email: string;
  securityAnswer: string;
  setSecurityAnswer: (answer: string) => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onBack, email, securityAnswer, setSecurityAnswer }) => {
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSecurityQuestions = async () => {
      const questions = [
        'What is your mother’s maiden name?',
        'What was the name of your first pet?',
        'What was the name of your first school?',
      ];
      setSecurityQuestions(questions);
      setSelectedQuestion(questions[0]);
    };

    fetchSecurityQuestions();
  }, [email]);

  const handleNext = () => {
    if (!selectedQuestion) {
      setError('Please select a security question');
    } else if (!securityAnswer) {
      setError('Please provide an answer to the security question');
    } else {
      setError('');
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 2: Answer Security Question</h2>
      {error && <ErrorMessage message={error} />}
      <select
        value={selectedQuestion}
        onChange={(e) => setSelectedQuestion(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        {securityQuestions.map((question, index) => (
          <option key={index} value={question}>
            {question}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Security Answer"
        value={securityAnswer}
        onChange={(e) => setSecurityAnswer(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <div className="flex justify-between">
        <button onClick={onBack} className="bg-secondaryTextColor text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
        <button onClick={handleNext} className="bg-buttonBlue text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
      </div>
    </div>
  );
};

export default Step2;
