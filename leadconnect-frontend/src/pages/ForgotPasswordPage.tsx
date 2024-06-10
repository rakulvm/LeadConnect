import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswdStep1 from '../components/Auth/ForgotPasswdStep1';
import ForgotPasswdStep2 from '../components/Auth/ForgotPasswdStep2';
import ForgotPasswdStep3 from '../components/Auth/ForgotPasswdStep3';
import logo from '../assets/logo.jpg'; // Adjust the import path as needed

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-backgroundColor flex flex-col items-center justify-center relative">
      <div className="absolute top-4 left-4 flex items-center">
        <img src={logo} alt="LeadConnect Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold"><Link to="/">LeadConnect</Link></span>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Create your LeadConnect Account</h1>
        <div className="flex justify-center space-x-2 mb-4">
          <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-buttonBlue' : 'bg-secondaryTextColor'}`}></div>
          <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-buttonBlue' : 'bg-secondaryTextColor'}`}></div>
          <div className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-buttonBlue' : 'bg-secondaryTextColor'}`}></div>
        </div>
        {step === 1 && <ForgotPasswdStep1 onNext={handleNext} email={email} setEmail={setEmail} />}
        {step === 2 && <ForgotPasswdStep2 onNext={handleNext} onBack={handleBack} email={email} securityAnswer={securityAnswer} setSecurityAnswer={setSecurityAnswer} />}
        {step === 3 && <ForgotPasswdStep3 onBack={handleBack} email={email} securityAnswer={securityAnswer} />}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
