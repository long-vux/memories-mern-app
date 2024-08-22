import { styled } from '@mui/system';
import { AppBar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Styled component using `styled`
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 0',
  padding: '0 50px',
  display: 'flex !important',
  flexDirection: 'row !important',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'cursive',
}));

const Heading = styled(Link)({
  color: 'rgba(0,183,255, 1)',
  fontSize: '50px',
  fontWeight: 'bold',
  margin: '10px 0',
  textDecoration: 'none',
});

const Image = styled('img')({
  marginLeft: '15px',
});

const StyledProfile = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
});

const StyledUsername = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'rgba(0,183,255, 1)',
});

export { StyledAppBar, Heading, Image, StyledProfile, StyledUsername };
