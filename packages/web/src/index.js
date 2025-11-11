// index.js - WEB
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// Service worker disabled - import removed to avoid build errors
// import registerServiceWorker from '../../components/src/registerServiceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
// Disable service worker for now to avoid undefined script path error
// registerServiceWorker();
