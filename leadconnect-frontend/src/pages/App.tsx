import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LeftSideNav from '../components/LeftSideNav';
import TopNav from '../components/TopNav';
import MainTable from '../components/MainTable';
import KeepInTouch from '../components/KeepInTouch';
import Login from './Login';
import Signup from './SignUp';
import ForgotPasswordPage from './ForgotPasswordPage';
import Profile from '../components/Profile';
import { format } from 'date-fns';
import { Contact, Connection } from '../types';

interface ContactResponse {
  success?: boolean;
  msg?: string;
  contacts?: Contact[];
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token')|| null) ;

  const navigate = useNavigate();


  useEffect(() => {
    const handleTokenExpiration = () => {
     setToken(null);
     localStorage.removeItem('token');
     navigate("/login");
   };
    if (!token) return;

    const fetchContacts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users/contacts', {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data: ContactResponse = await response.json();
    if (!response.ok) {
      if (data.success === false) {
       localStorage.removeItem('token');
        return;
      } else {
        throw new Error(data.msg || 'Network response was not ok');
      }
    }
        if (!Array.isArray(data.contacts)) {
          throw new Error('Expected an array of contacts');
        }
        const augmentedData = data.contacts.map((contact) => {
          const parsedDate = new Date(contact.last_interacted);
          console.log(`Original: ${contact.last_interacted}, Parsed: ${parsedDate}`);
          return {
            ...contact,
            last_interacted: format(parsedDate, 'MMM d'),
          };
        });
        console.log(augmentedData)
        console.log("fff")
        setContacts(augmentedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
/*
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
*/
    fetchContacts();
//    fetchConnections();
  }, [token]);

  const deleteContact = (url: string) => {
    const temp = contacts.filter(contact => contact.contact_url !== url);
    setContacts(temp);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={(jwt: string) => {
          console.log(jwt)
          setToken(jwt);
          localStorage.setItem('token', jwt);
          navigate('/main');
        }} />} />
        <Route path="/main" element={
          token ? (
            <div className='flex bg-backgroundColor'>
              <LeftSideNav />
              <div className='bg-red w-5/6'>
                <TopNav />
                <MainTable contacts={contacts} setContacts={setContacts} token={token} deleteContact={deleteContact} />
                {error && <div>Error fetching contacts: {error}</div>}
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/keepintouch" element={
          token ? (
            <div className='flex bg-backgroundColor'>
              <LeftSideNav />
              <div className='bg-red w-5/6'>
                <TopNav />
                <KeepInTouch contacts={contacts} />
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={
          token ? <Profile /> : <Navigate to="/login" />
        } />
      </Routes>
    </>
  );
};

export default App;
