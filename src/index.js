import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('app'));
// STRICT MODE RENDERS THE COMPONENT TWICE!!
root.render(<App />);
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
