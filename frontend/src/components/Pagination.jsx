import { Link, useNavigate } from 'react-router-dom';
import { StyledPagination, StyledPaginationItem } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';
import { useEffect } from 'react';

const CustomPagination = ({ page }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { numberOfPages } = useSelector((state) => state.posts);


    useEffect(() => {
      if(page) dispatch(getPosts(page));
    }, [page]);

    const handlePageChange = (event, value) => {
      navigate(`/posts?page=${value}`);
    };
  
    return (
      <StyledPagination
        count={numberOfPages}
        page={Number(page) || 1}
        onChange={handlePageChange}
        renderItem={(item) => (
          <StyledPaginationItem
            {...item}
            key={item.page}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    );
  };
  
  export default CustomPagination;
  