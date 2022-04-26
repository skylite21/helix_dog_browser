import React, { StrictMode } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

// STRICT MODE RENDERS THE COMPONENT TWICE!!
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
