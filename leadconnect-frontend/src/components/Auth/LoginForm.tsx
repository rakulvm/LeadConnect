import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import SubmitButton from '../SubmitButton';
import ErrorMessage from '../ErrorMessage';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call login service
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <button type="button" className="flex items-center justify-center mb-4 p-2 border rounded bg-gray-800 text-white rounded-lg shadow-lg">
        <FaGithub className="mr-2" /> Login with GitHub
      </button>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-4 p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 p-2 border rounded"
        required
      />
      {error && <ErrorMessage message={error} />}
      <SubmitButton type="Login" />
      <p className="text-sm text-gray-600 mt-4">
        By signing in, you accept all terms & conditions and privacy policies.
      </p>
    </form>
  );
};

export default LoginForm;
