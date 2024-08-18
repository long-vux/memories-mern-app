import { styled } from "@mui/material/styles";
import { Card, CardMedia, Button } from "@mui/material";

export const StyledCard = styled(Card)({
  maxWidth: '100%',
  margin: '20px 0',
  position: 'relative',
});

export const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundBlendMode: 'darken',
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

export const StyledButton = styled(Button)({
  color: 'white',
});