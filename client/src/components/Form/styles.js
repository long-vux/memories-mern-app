import { styled } from '@mui/system';
import { Paper, Button } from '@mui/material';

// Styled components using the `styled` utility
const Root = styled('div')(({ theme }) => ({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledForm = styled('form')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px'
});

const FileInput = styled('div')({
  width: '97%',
  margin: '10px 0',
});

const ButtonSubmit = styled(Button)({
  marginBottom: 10,
});

export { Root, StyledPaper, StyledForm, FileInput, ButtonSubmit };
