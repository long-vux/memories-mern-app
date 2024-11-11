import { Paper, Avatar, Button, Container } from '@mui/material';
import { styled } from '@mui/system';


export const StyledPaper = styled(Paper)`
  margin-top: 40px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

`;

export const StyledRoot = styled(Container)`
  & .MuiTextField-root {
    margin: 8px; /* 1 * 8px (default spacing unit) */
  }
`;

export const StyledAvatar = styled(Avatar)`
  margin: 8px; /* 1 * 8px */
  background-color: #f50057; /* Custom color instead of theme.palette.secondary.main */
`;

export const StyledForm = styled('form')`
  width: 100%;
  margin-top: 24px; 
`;

export const StyledSubmit = styled(Button)`
  margin: 24px 0 16px; /* 3 * 8px, 0, 2 * 8px */
`;

export const StyledGoogleButton = styled(Button)`
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`; 

export const StyledLabel = styled('span')`
  font-family: serif;
  font-weight: normal;
`;

export const StyledIcon = styled('span')`
  background: url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
`;

export const StyledButtonText = styled('span')`
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 16px; /* Updated font size */
  font-weight: bold;
  font-family: 'Arial', sans-serif; /* Updated font family */
`;