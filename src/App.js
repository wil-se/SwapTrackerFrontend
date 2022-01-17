import React from 'react';
import { Routes, Route } from "react-router-dom";
import SideBar from 'components/SideBar';
import TopNavbar from 'components/TopNavbar';
import Staking from 'pages/Staking';
import Trade from 'pages/Trade';
import 'style/App.scss';
import Wallet from 'pages/Wallet';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
 
  return (
    <>
      <TopNavbar></TopNavbar>
      <SideBar/>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <Routes>
        <Route path="/staking" element={<Staking/>}/>
        <Route path="/trade" element={<Trade/>}/>
        <Route path="/wallet" element={<Wallet/>}/>
      </Routes>
    </>
  );
}

export default App;
