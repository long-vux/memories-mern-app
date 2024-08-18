import React from "react";
import { CardActions, CardContent, Typography } from "@mui/material";
import { Delete, ThumbUpAlt, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { StyledCard, StyledCardMedia, Overlay, Overlay2, StyledButton } from "./styles";

const Post = ({ post }) => {
  return (
    <StyledCard>
      <StyledCardMedia image={post.selectedFile} title={post.title} />
      <Overlay>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </Overlay>
      <Overlay2>
        <StyledButton size="small" onClick={() => {}}>
          <MoreHoriz fontSize="default" />
        </StyledButton>
      </Overlay2>
      <div>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography variant="h5" gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions>
        <StyledButton size="small" color="primary" onClick={() => {}}>
          <ThumbUpAlt fontSize="small" />
          Like {post.likeCount}
        </StyledButton>
        <StyledButton size="small" color="primary" onClick={() => {}}>
          <Delete fontSize="small" />
          Delete
        </StyledButton>
      </CardActions>
    </StyledCard>
  )
}

export default Post;