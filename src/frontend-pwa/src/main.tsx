import React from 'react';
import { SSOProvider } from '@bcgov/citz-imb-sso-react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import AppProvider from './providers/AppProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <SSOProvider backendURL="http://localhost:3000" idpHint="idir">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SSOProvider>
    </AppProvider>
  </React.StrictMode>,
);
