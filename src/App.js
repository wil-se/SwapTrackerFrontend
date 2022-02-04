import React,{useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from 'components/SideBar';
import TopNavbar from 'components/TopNavbar';
import Staking from 'pages/Staking';
import Trade from 'pages/Trade';
import Tier from 'pages/Tier';
import Wallet from 'pages/Wallet';
import History from 'pages/History';
import Dashboard from 'pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'style/App.scss';


function App() {


  return (
    <>
      <Container fluid>
        <TopNavbar></TopNavbar>
        <SideBar/>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        <Routes>
          <Route path="/staking" element={<Staking />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/tiers" element={<Tier />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
      
    </>
  );
}

export default App;
