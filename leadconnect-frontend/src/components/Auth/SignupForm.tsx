import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5'; // Import the new step component
interface SignupFormProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  handleInputChange: (input: string, value: string) => void;
  formData: any;
  handleSubmit: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  currentStep,
  nextStep,
  prevStep,
  handleInputChange,
  formData,
  handleSubmit
}) => {
  switch (currentStep) {
    case 1:
      return <Step1 nextStep={nextStep} handleInputChange={handleInputChange} formData={formData} />;
    case 2:
      return <Step2 nextStep={nextStep} prevStep={prevStep} handleInputChange={handleInputChange} formData={formData} />;
    case 3:
      return <Step3 nextStep={nextStep} prevStep={prevStep} handleInputChange={handleInputChange} formData={formData} />;
    case 4:
      return <Step4 nextStep={nextStep} prevStep={prevStep} handleInputChange={handleInputChange} formData={formData} />;
    case 5:
        return <Step5 prevStep={prevStep} handleInputChange={handleInputChange} formData={formData} handleSubmit={handleSubmit} />; // Add new step
    default:
      return <Step1 nextStep={nextStep} handleInputChange={handleInputChange} formData={formData} />;
  }
};

export default SignupForm;
