import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import logo from '../assets/logo.jpg'; // Adjust the import path as needed

const Login: React.FC = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleInputChange = (input: string, value: string) => {
    setFormData({
      ...formData,
      [input]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      // Handle successful response here
      // For example, redirect to another page or show a success message
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setErrorMessage('Invalid username or password. Please try again.');
      // Handle error here
      // For example, show an error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-backgroundColor flex items-center justify-center relative">
      <div className="absolute top-4 left-4 flex items-center">
        <img src={logo} alt="LeadConnect Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold"><Link to="/">LeadConnect</Link></span>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login to your LeadConnect Account</h1>
        <p className="text-center mb-4">
          Don't have a LeadConnect Account? <Link to="/signup" className="text-buttonBlue underline">Sign Up</Link>
        </p>
        <LoginForm 
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          errorMessage={errorMessage || ""} 
        />
        <p className="text-center mt-4">
          Forgot your password? <Link to="/forgot-password" className="text-buttonBlue underline">Click here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
