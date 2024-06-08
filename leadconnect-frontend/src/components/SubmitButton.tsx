import React from 'react';

interface SubmitButtonProps {
  type: 'Sign Up' | 'Login';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type }) => {
  return (
    <button
      type="submit"
      className="p-2 bg-buttonBlue text-cardWhite rounded border-2 border-transparent"
    >
      {type}
    </button>
  );
};

export default SubmitButton;
