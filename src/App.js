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
import { useSwapTrackerMediator } from 'hooks/useContract';
import {useNavigate} from 'react-router-dom'
import {getTier} from 'utils/walletHelpers'
import { useWeb3React } from '@web3-react/core';


function App() {
  const navigation = useNavigate();
  const { account } = useWeb3React();
  const swapTrackerMediator = useSwapTrackerMediator();

  useEffect(()=>{
      (async()=>{
          if(account){
              await getTier(swapTrackerMediator,navigation,account)
          }
      })()
  },[account])

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
