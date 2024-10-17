import { styled } from '@mui/material';
import { CardMedia, Button, Typography } from '@mui/material';

export const StyledCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const StyledCardMedia2 = styled(CardMedia)({
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: '0 auto',
});


export const StyledButton = styled(Button)({
    width: '100px',
    height: '100px',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
});

export const StyledCardActions = styled(Typography)({
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  });

