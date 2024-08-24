import React, { useState, useEffect } from 'react';
import memories from '../../images/memories.png';
import { StyledAppBar, Heading, Image, StyledProfile, StyledUsername } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [user?.token]);

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
                        <StyledUsername >{user.result.name}</StyledUsername>
                        <Button  variant="contained" color="success" onClick={handleLogout}>Logout</Button>
                    </StyledProfile>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;