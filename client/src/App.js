import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Posts from './components/Posts/Posts';

const isAuthenticated = JSON.parse(localStorage.getItem('profile'));

function App() {
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={isAuthenticated ? <Home /> : <Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;