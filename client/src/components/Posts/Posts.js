import React from 'react';
import { GridContainer } from './styles';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? <CircularProgress /> : (
      <GridContainer container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </GridContainer>
    )
  );
}

export default Posts;
