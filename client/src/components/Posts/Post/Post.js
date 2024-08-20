import React from "react";
import { Typography, Button } from "@mui/material";
import { Delete, ThumbUpAlt, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { StyledCard, StyledCardMedia, Overlay, Overlay2, StyledCardContent, StyledCardActions, StyledCardTitle } from "./styles";

const Post = ({ post, setCurrentId }) => {
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
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <StyledCardTitle variant="h4" gutterBottom>{post.title}</StyledCardTitle>
      <StyledCardContent>
        <Typography variant="h6" gutterBottom>{post.message}</Typography>
      </StyledCardContent>
      <StyledCardActions>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAlt fontSize="small"  />
          Like {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <Delete fontSize="small" />
          Delete
        </Button>
      </StyledCardActions>
    </StyledCard>
  )
}

export default Post;