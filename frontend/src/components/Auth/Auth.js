import { StyledPaper, StyledAvatar, StyledForm, StyledSubmit } from './styles';
import { LockOutlined } from '@mui/icons-material';
import { Typography, Container, Grid, Button } from '@mui/material';
import { useState } from 'react';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const isAuthenticated = JSON.parse(localStorage.getItem('profile'));

    if (isAuthenticated) {
        navigate('/');
    }

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (isSignup) {
            dispatch(signup(formData, navigate))
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setIsSignup(false);
                        setFormData({
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        });
                    }
                })
                .catch(() => {
                    alert('Login successful, please login again');
                    navigate('/auth');
                });
        } else {
            dispatch(signin(formData, navigate))
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    }
                })
                .catch(() => {
                });
        }
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        <Container component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <StyledAvatar>
                    <LockOutlined />
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
                        <Input
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                type={showPassword ? 'text' : 'password'}
                                handleChange={handleChange}
                            />
                        )}
                    </Grid>
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{
                                marginTop: 2,
                                fontWeight: 'bold',
                                fontSize: '0.875rem',
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    <StyledSubmit type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? 'Sign up' : 'Sign in'}
                    </StyledSubmit>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledPaper>
        </Container>
    );
};

export default Auth;
