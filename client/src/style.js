import { styled } from '@mui/system';
import { AppBar } from '@mui/material';

// Styled component using `styled`
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex !important',
  flexDirection: 'row !important',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Heading = styled('h1')({
  color: 'rgba(0,183,255, 1)',
});

const Image = styled('img')({
  marginLeft: '15px',
});

export { StyledAppBar, Heading, Image };
