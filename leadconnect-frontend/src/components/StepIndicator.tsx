import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-4">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-3 h-3 mx-1 rounded-full ${
            index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default StepIndicator;
