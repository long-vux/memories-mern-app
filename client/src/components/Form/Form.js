import React, { useState, useEffect } from 'react';
import { StyledPaper, StyledForm, FileInput, ButtonSubmit } from './styles';
import { TextField, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

// @ts-ignore
import FileBase from 'react-file-base64';
const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
        setCurrentId(null);
    }

    const clear = () => {
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }

    return (
        <StyledPaper>
            <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
                {currentId ? <Typography variant="h6">Editing a Memory</Typography> : <Typography variant="h6">Creating a Memory</Typography>}
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}/>
                <FileInput>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </FileInput>
                <ButtonSubmit type="submit" variant='contained' color='primary' size='large' fullWidth>Submit</ButtonSubmit>
                <Button type="button" variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </StyledForm>
        </StyledPaper>
    );
}   

export default Form;