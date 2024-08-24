import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Corrected import
import rootReducer from './reducers';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const googleClientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={googleClientId}>
      <React.StrictMode>  
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);