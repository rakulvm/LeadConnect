import { Routes, Route } from 'react-router-dom';
import LeftSideNav from '../components/LeftSideNav'
import TopNav from '../components/TopNav'
import MainTable from '../components/MainTable'
import Login from './Login'
import Signup from './SignUp';

const App: React.FC = () => {
    return (
    <Routes>
      <Route path="/" element={
      <div className='flex bg-backgroundColor' >
        <LeftSideNav></LeftSideNav>
        <div className='bg-red w-5/6'>
          <TopNav></TopNav>
          <MainTable></MainTable>
        </div>
      </div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    );
  };

export default App
