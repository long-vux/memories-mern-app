import React from "react";
import { Typography, Button } from "@mui/material";
import { Delete, ThumbUpAlt, ThumbUpAltOutlined, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { StyledCard, StyledCardMedia, Overlay, Overlay2, StyledCardContent, StyledCardActions, StyledCardTitle, Tags } from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";


const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

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
  
  return (
    <StyledCard raised elevation={6}>
      <StyledCardMedia image={post?.selectedFile} title={post?.title} />
      <Overlay>
        <Typography variant="h6">{post?.name}</Typography>
        <Typography variant="body2">{moment(post?.createdAt).fromNow()}</Typography>
      </Overlay>
      <Overlay2>
        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <Button size="small" onClick={() => setCurrentId(post?._id)}>
            <MoreHoriz fontSize="default" />
          </Button>
        )}
      </Overlay2>
      <div>
        <Tags variant="body2" color="textSecondary">{post?.tags.map((tag) => `#${tag} `)}</Tags>
      </div>
      <StyledCardTitle variant="h2" gutterBottom>{post?.title}</StyledCardTitle>
      <StyledCardContent>
        <Typography color="textSecondary" gutterBottom fontSize={14} >{post?.message}</Typography>
      </StyledCardContent>
      <StyledCardActions>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post?._id, user?.result?._id))}>
          <Likes />
        </Button>
        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post?._id))}>
            <Delete fontSize="small" />
            &nbsp;Delete
          </Button>
        )}
      </StyledCardActions>
    </StyledCard>
  )
}

export default Post;