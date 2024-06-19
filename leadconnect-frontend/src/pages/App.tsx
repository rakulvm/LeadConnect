import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LeftSideNav from '../components/LeftSideNav';
import TopNav from '../components/TopNav';
import MainTable from '../components/MainTable';
import Login from './Login';
import AddContactForm from '../components/AddContact';
import Signup from './SignUp';
import ForgotPasswordPage from './ForgotPasswordPage';
import KeepInTouch from '../components/KeepInTouch'; // Import the KeepInTouch component
import { format } from 'date-fns'; // Import date-fns

interface Connection {
  contact_url: string;
  name: string;
  profile_pic_url: string;
}

interface Experience {
  bulletpoints: string;
  company_duration: string;
  company_location: string;
  company_name: string;
  company_role: string;
  company_total_duration: string;
}

interface Contact {
  about: string;
  contact_url: string;
  current_location: string;
  experiences: Experience[];
  headline: string;
  name: string;
  profile_pic_url: string;
  frequency: string;
  last_interacted: string;
  notes: string; // Add notes field
}

interface ContactResponse {
  contacts: Contact[];
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchContacts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users/contacts', {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ContactResponse = await response.json();
        if (!Array.isArray(data.contacts)) {
          throw new Error('Expected an array of contacts');
        }
        const augmentedData = data.contacts.map((contact: Contact) => ({
          ...contact,
          last_interacted: format(new Date(contact.last_interacted), 'MMM d'),
        }));
        setContacts(augmentedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    const fetchConnections = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users/get_notifications', {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Connection[] = await response.json();
        setConnections(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchContacts();
    fetchConnections();
  }, [token]);

  const deleteContact = (url: string) => {
    const temp = contacts.filter(contact => contact.contact_url !== url);
    setContacts(temp);
  }

  return (
    <>
      {/*<NotificationComponent connections={connections} />*/}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={(jwt: string) => {
          setToken(jwt);
          localStorage.setItem('token', jwt);
          navigate('/main');
        }} />} />
        <Route path="/main" element={
          <div className='flex bg-backgroundColor'>
            <LeftSideNav />
            <div className='bg-red w-5/6'>
              <TopNav />
              <MainTable contacts={contacts} setContacts={setContacts} token={token} deleteContact={deleteContact} />
              {error && <div>Error fetching contacts: {error}</div>}
            </div>
          </div>
        } />
        <Route path="/keepintouch" element={
          <div className='flex bg-backgroundColor'>
            <LeftSideNav />
            <div className='bg-red w-5/6'>
              <TopNav />
              <KeepInTouch />
            </div>
          </div>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </>
  );
};

export default App;
