import { styled } from "@mui/material/styles";
import { Card, CardMedia, Typography } from "@mui/material";

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '15px',
  height: '100%',
  position: 'relative',
});

export const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundBlendMode: 'darken',
  cursor: 'pointer',
});

export const Overlay = styled('div')({
  position: 'absolute',
  top: '20px',
  left: '20px',
  color: 'white',
});

export const Overlay2 = styled('div')({
  position: 'absolute',
  top: '20px',
  right: '20px',
  color: 'white',
});

export const StyledCardContent = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 18px',
});

export const StyledCardActions = styled(Typography)({
  padding: '0 16px 8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
});

export const StyledCardTitle = styled(Typography)({
  padding: '0 16px 0 16px',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  marginBottom: '10px',
  cursor: 'pointer',
});

export const Tags = styled(Typography)({
  padding: '8px 16px 0 16px',
  fontSize: '1rem',
  fontWeight: 'bold',
  marginBottom: '10px',
});