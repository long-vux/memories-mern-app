import styled from '@emotion/styled';
import { Pagination, PaginationItem } from '@mui/material';


export const StyledPagination = styled(Pagination)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    '& .MuiPaginationItem-root': {
        color: '#3f51b5', // Customize text color
    },
});

export const StyledPaginationItem = styled(PaginationItem)({
    backgroundColor: '#ccc', // Customize active page background color
    color: '#fff', // Customize active page text color
});

