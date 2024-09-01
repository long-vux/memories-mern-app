import React, { useState, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import memories from '../../images/memories.png';
import { StyledAppBar, Heading, Image, StyledProfile, StyledUsername } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
        setUser(null);
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            // Check if the token is a JWT by verifying its structure
            const isJwtToken = token.split('.').length === 3;

            if (isJwtToken) {
                // Decode and validate JWT token
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    handleLogout();
                }
            } else {
                // Handle OAuth token (example: Google OAuth)
                fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.error) {
                            // Invalid OAuth token, log out
                            handleLogout();
                        }
                    })
                    .catch((error) => {
                        console.error('Error validating OAuth token:', error);
                        handleLogout();
                    });
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [user?.token, handleLogout]);

    return (
        <StyledAppBar position="static" color="inherit">
            <div>
                <Heading to="/" variant="h2" align="center">Memories</Heading>
                <Image src={memories} alt="memories" height="50" />
            </div>
            <Toolbar>
                {user ? (
                    <StyledProfile>
                        <Avatar alt={user.result.name} src={user.result.imageUrl} />
                        <StyledUsername>{user.result.name}</StyledUsername>
                        <Button variant="contained" color="success" onClick={handleLogout}>Logout</Button>
                    </StyledProfile>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;
