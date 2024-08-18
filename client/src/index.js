import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18
import App from './App';

// Create the root using React 18's createRoot method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app with the new render method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
