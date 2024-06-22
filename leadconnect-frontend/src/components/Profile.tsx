import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import ErrorMessage from './ErrorMessage';

interface FormData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  company: string;
  number_of_employees: string;
  province: string;
  profile_picture_url: string;
  security_question: string;
  security_answer: string;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    company: '',
    number_of_employees: '',
    province: '',
    profile_picture_url: '',
    security_question: '',
    security_answer: '',
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend
    fetch('http://127.0.0.1:5000/api/users/profile', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        return response.json();
      })
      .then((data) => {
        // Ensure that all keys in formData are defined
        setFormData({
          username: data.username || '',
          password: '',
          email: data.email || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone_number: data.phone_number || '',
          company: data.company || '',
          number_of_employees: data.number_of_employees || '',
          province: data.province || '',
          profile_picture_url: data.profile_picture_url || '',
          security_question: data.security_question || '',
          security_answer: data.security_answer || '',
        });
      })
      .catch((error) => setError('Failed to load user data. Error: '+error.toString()));
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_picture_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data here
    if (!formData.email.includes('@')) {
      setError('Invalid email address.');
      return;
    }

    // Submit form data to the backend
    fetch('http://127.0.0.1:5000/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile.');
        }
        return response.json();
      })
      .then(() => {
        setShowModal(true); // Show success modal
      })
      .catch((error) => setError(error.message));
  };

  const handleCancel = () => {
    navigate('/main');
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/main');
  };

  return (
    <div className="p-6 bg-backgroundColor">
      <div className="max-w-2xl mx-auto bg-cardWhite p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Account Settings</h2>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="profilePicture" className="cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                {formData.profile_picture_url ? (
                  <img
                    src={formData.profile_picture_url}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <FaCamera className="text-gray-500 text-2xl" />
                )}
              </div>
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-gray-600 mt-2">Choose Profile Photo</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">First name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone number</label>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Number of Employees</label>
            <select
              value={formData.number_of_employees}
              onChange={(e) => handleInputChange('number_of_employees', e.target.value)}
              className="mb-4 p-2 border rounded w-full"
              required
            >
              <option value="" disabled>Number of Employees</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1001-5000">1001-5000</option>
              <option value="5001-10000">5001-10000</option>
              <option value="10001+">10001+</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Province</label>
            <select
              value={formData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              className="mb-4 p-2 border rounded w-full"
              required
            >
              <option value="" disabled>Province</option>
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="New Brunswick">New Brunswick</option>
              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Saskatchewan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Security Question</label>
            <select
              value={formData.security_question}
              onChange={(e) => handleInputChange('security_question', e.target.value)}
              className="mb-4 p-2 border rounded w-full"
              required
            >
              <option value="" disabled>Security Question</option>
              <option value="What is your mother’s maiden name?">What is your mother’s maiden name?</option>
              <option value="What was the name of your first pet?">What was the name of your first pet?</option>
              <option value="What was the make of your first car?">What was the make of your first car?</option>
              <option value="What is your favorite color?">What is your favorite color?</option>
              <option value="What city were you born in?">What city were you born in?</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Security Answer</label>
            <input
              type="text"
              value={formData.security_answer}
              onChange={(e) => handleInputChange('security_answer', e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-buttonBlue text-white p-2 rounded">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="bg-secondaryTextColor text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Changes Saved</h2>
            <p>Your profile has been updated successfully.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-buttonBlue text-white p-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
