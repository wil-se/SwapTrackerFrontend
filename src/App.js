import React from 'react';
import SideBar from 'components/SideBar';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

import 'style/App.scss';

function App() {
 
  return (
    <>
      <TopNavbar></TopNavbar>
      <SideBar/>
      
      
    </>
  );
}

export default App;
