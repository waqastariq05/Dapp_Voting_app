import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import VotingState from './context/VotingState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VotingState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VotingState>
  </React.StrictMode>
);
