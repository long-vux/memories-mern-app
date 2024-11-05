import React from "react";
import { Typography, Button } from "@mui/material";
import { Delete, ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material";
import moment from "moment";
import { StyledCard, StyledCardMedia, Overlay, StyledCardContent, StyledCardActions, StyledCardTitle, Tags } from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { getPosts, getPostDetails } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const handleLike = () => {
    dispatch(likePost(post?._id, user?.result?._id))
      .then(() => {
        dispatch(getPosts()); // Re-fetch posts after liking
      });
  };

  const handleDelete = () => {
    dispatch(deletePost(post?._id)).then(() => {
      dispatch(getPosts()); // Re-fetch posts after deleting
    });
  };

  const fetchPostDetails = () => {
    dispatch(getPostDetails(post?._id))
    navigate(`/posts/${post?._id}`);
  };

  return (
    <StyledCard raised elevation={6}>
      <StyledCardMedia image={post?.selectedFile} title={post?.title} />
      <Overlay>
        <Typography variant="h6">{post?.name}</Typography>
        <Typography variant="body2">{moment(post?.createdAt).fromNow()}</Typography>
      </Overlay>
      {/* <Overlay2>
        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <Button size="small" onClick={() => setCurrentId(post?._id)}>
            <MoreHoriz fontSize="default" />
          </Button>
        )}
      </Overlay2> */}
      <div>
        <Tags variant="body2" color="textSecondary">{post?.tags.map((tag) => `#${tag} `)}</Tags>
      </div>
      <StyledCardTitle variant="h2" gutterBottom onClick={fetchPostDetails}>{post?.title}</StyledCardTitle>
      <StyledCardContent>
        <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} color="textSecondary" gutterBottom fontSize={14} >{post?.message}</Typography>
      </StyledCardContent>
      <StyledCardActions>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <Button size="small" color="primary" onClick={handleDelete}>
            <Delete fontSize="small" />
            &nbsp;Delete
          </Button>
        )}
      </StyledCardActions>
    </StyledCard>
  )
}

export default Post;