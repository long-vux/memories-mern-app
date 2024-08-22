import React from 'react';
import memories from '../../images/memories.png';
import { StyledAppBar, Heading, Image, StyledProfile, StyledUsername } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
    };

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