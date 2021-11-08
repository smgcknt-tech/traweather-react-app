import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './AppStore';
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter forceRefresh={true}>
        <App />
      </BrowserRouter >
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
