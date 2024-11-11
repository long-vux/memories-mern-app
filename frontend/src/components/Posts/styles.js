import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

// Define styled components using `styled`
const GridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const SmMargin = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ActionDiv = styled('div')({
  textAlign: 'center',
});

export { GridContainer, SmMargin, ActionDiv };
