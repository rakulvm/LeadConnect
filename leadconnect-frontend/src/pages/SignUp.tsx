import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/Auth/SignupForm';
import StepIndicator from '../components/StepIndicator';
import logo from '../assets/logo.jpg';

const Signup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    company: '',
    number_of_employees: '',
    province: '',
    profile_picture_url: '',
    security_question: '',
    security_answer: ''
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleInputChange = (input: string, value: string) => {
    setFormData({
      ...formData,
      [input]: value
    });
  };

  const handleSubmit = () => {
    // will submit form data to the backend 
    // doing it later
    console.log(formData);
  };

  return (
    <div className="min-h-screen py-12 flex flex-col items-center justify-center bg-backgroundColor">
      <div className="absolute top-4 left-4 flex items-center">
        <img src={logo} alt="LeadConnect Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold"><Link to="/">LeadConnect</Link></span>
      </div>
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
        <h1 className="text-2xl pt-7 font-bold mb-4 text-center">Create your LeadConnect Account</h1>
        <StepIndicator currentStep={currentStep} totalSteps={4} />
        <SignupForm
          currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}
          handleInputChange={handleInputChange}
          formData={formData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Signup;
