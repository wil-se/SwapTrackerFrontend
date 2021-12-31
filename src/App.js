import React from 'react';
import { Routes, Route } from "react-router-dom";
import SideBar from 'components/SideBar';
import TopNavbar from 'components/TopNavbar';
import Staking from 'pages/Staking';
import Trade from 'pages/Trade';

import 'style/App.scss';

function App() {
 
  return (
    <>
      <TopNavbar></TopNavbar>
      <SideBar/>
      <Routes>
        <Route path="/staking" element={<Staking/>}/>
        <Route path="/trade" element={<Trade/>}/>
      </Routes>
    </>
  );
}

export default App;
