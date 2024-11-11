import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, addImage,likePost, deletePost, getPosts } from '../../actions/posts';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import { Delete, ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material";
import { StyledCardMedia, StyledCardMedia2, StyledButton, StyledCardActions } from './styles';

function PostDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.postDetails);
    const fileInputRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    const handleLike = () => {
        dispatch(likePost(post?._id, user?.result?._id)).then(() => {
            dispatch(getPostDetails(id)); // Re-fetch posts after liking
        });
    };

    const handleDelete = () => {
        dispatch(deletePost(post?._id)).then(() => {
            navigate('/');
        });
    };
    useEffect(() => {
        dispatch(getPostDetails(id));
    }, [dispatch, id]);

    const handleAddImage = () => {
        fileInputRef.current.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            dispatch(addImage(id, base64Image))
                .then(() => {
                    dispatch(getPostDetails(id));
                })
                .catch((error) => {
                    console.log('Error uploading image', error);
                });
        }
        reader.readAsDataURL(file);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '20px' }}>
            <div style={{ minHeight: '100vh', padding: '40px', color: '#white', backgroundColor: '#ccc', width: '70%', borderRadius: '10px' }}>
                <Typography variant="h1" style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '20px 0' }}>
                    Welcome to {post?.name}'s Memories
                </Typography>
                {post ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', padding: '20px' }}>
                        <div>
                            <StyledCardMedia image={post.selectedFile} title={post.title} />
                        </div>
                        <div>
                            <Typography variant="h1" style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {post.title}
                            </Typography>
                            <Typography variant="body1" style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '20px', lineHeight: '1.6', letterSpacing: '0.01em', wordBreak: 'break-word' }}>
                                {post.message}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h1" style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Discovery
                            </Typography>
                            <Grid container spacing={2} style={{ width: '75%' }}>
                                {post.images.map((image, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index} style={{ paddingBottom: '20px' }}>
                                        <StyledCardMedia2 image={image} />
                                    </Grid>
                                ))}
                                {/* Add the StyledButton as a Grid item */}
                                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {user?.result?._id === post?.creator && (
                                        <>
                                            <StyledButton onClick={handleAddImage}>+ Add Image</StyledButton>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
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
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default PostDetails;
