import React, {useEffect} from 'react';
import { GridContainer } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import Post from './Post/Post';
import { getPosts } from '../../actions/posts';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);


  return (
    isLoading ? <CircularProgress /> : (
      <GridContainer container alignItems="stretch" spacing={3}>
        {posts?.data?.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </GridContainer>
    )
  );
}

export default Posts;
