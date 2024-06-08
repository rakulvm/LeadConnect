import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import logo from '../assets/logo.jpg'; // Adjust the import path as needed

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-backgroundColor flex items-center justify-center relative">
      <div className="absolute top-4 left-4 flex items-center">
        <img src={logo} alt="LeadConnect Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold"><Link to="/">LeadConnect</Link></span>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login to your LeadConnect Account</h1>
        <p className="text-center mb-4">
          Don't have a LeadConnect Account? <Link to="/signup" className="text-buttonBlue-300 underline">Sign Up</Link>
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

