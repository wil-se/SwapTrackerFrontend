import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Providers from './Providers';
import {BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Providers>
      <App />
    </Providers>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
