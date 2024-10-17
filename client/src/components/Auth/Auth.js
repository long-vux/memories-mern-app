import { StyledPaper, StyledAvatar, StyledForm, StyledSubmit } from './styles';
import { LockOutlined, Google } from '@mui/icons-material';
import { Typography, Container, Grid, Button } from '@mui/material';
import { useState } from 'react';
import Input from './Input';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SIGNIN } from '../../constants/actionTypes';
import axios from 'axios';
import { signin, signup } from '../../actions/auth';



const Auth = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = JSON.parse(localStorage.getItem('profile'));

    if(isAuthenticated) {
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



    // // Reset form data on component mount
    // useEffect(() => {
    //     setIsSignup(false);
    // }, []);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate)).then(() => {
                setIsSignup(false); // Switch to signin after successful signup
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            });
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                // Fetch user info using the access token
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${response.access_token}` },
                });

                console.log(userInfo.data);

                dispatch({
                    type: SIGNIN,
                    data: {
                        result: userInfo.data,
                        token: response.access_token,
                    },
                });

                // Navigate after successful login
                navigate('/');
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        },
    });
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
                    <StyledSubmit type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? 'Sign up' : 'Sign in'}
                    </StyledSubmit>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        startIcon={<Google />} // or use a custom icon with <img src="/path/to/google-icon.svg" alt="Google icon" />
                        onClick={() => login()}
                        sx={{
                            backgroundColor: '#4285F4',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#357ae8',
                            },
                        }}
                    >
                        Sign in with Google
                    </Button>
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
