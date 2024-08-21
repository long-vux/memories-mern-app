import React from "react";
import { Typography, Button } from "@mui/material";
import { Delete, ThumbUpAlt, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { StyledCard, StyledCardMedia, Overlay, Overlay2, StyledCardContent, StyledCardActions, StyledCardTitle, Tags } from "./styles";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <StyledCard>
      <StyledCardMedia image={post.selectedFile} title={post.title} />
      <Overlay>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </Overlay>
      <Overlay2>
        <Button size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHoriz fontSize="default" />
        </Button>
      </Overlay2>
      <div>
        <Tags variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Tags>
      </div>
      <StyledCardTitle variant="h4" gutterBottom>{post.title}</StyledCardTitle>
      <StyledCardContent>
        <Typography gutterBottom component="p">{post.message}</Typography>
      </StyledCardContent>
      <StyledCardActions>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAlt fontSize="small"  />
          &nbsp;Like &nbsp;{post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <Delete fontSize="small" />
          &nbsp;Delete
        </Button>
      </StyledCardActions>
    </StyledCard>
  )
}

export default Post;