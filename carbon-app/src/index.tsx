// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CarbonRegionalProvider } from './Context/RegionalCarbonIntensityContext';

ReactDOM.render(
  <CarbonRegionalProvider>
  <Router>
    <App />
    </Router>
  </CarbonRegionalProvider>,
  document.getElementById('root')
);
