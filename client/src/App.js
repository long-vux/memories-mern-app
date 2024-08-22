import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const isAuthenticated = JSON.parse(localStorage.getItem('profile'));

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={isAuthenticated ? <Home /> : <Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;