import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('app'));
// STRICT MODE RENDERS THE COMPONENT TWICE!!
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
