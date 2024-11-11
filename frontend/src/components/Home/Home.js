import { Container, Grow, Grid, TextField, Paper, Button } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from '../ChipInput/ChipInput';
import { StyledAppBar } from './styles';
import { getPostsBySearch } from '../../actions/posts';
import CustomPagination from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    // const location = useLocation();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;

    useEffect(() => {
        dispatch(getPosts(page));
    }, [dispatch, page]);

    const searchPost = () => {
        if(search.trim() || tags) {
            console.log('tags', tags)
            // navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
            dispatch(getPostsBySearch({ search, tags: tags.join(',')}));
            // dispatch(getPosts());
        } else {
            navigate('/posts');
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <StyledAppBar position="static" color="inherit">

                            <TextField variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                variant="outlined"
                                label="Search Tags"
                                placeholder="Seprate by enter"
                                fullWidth 
                                value={tags}
                                onAdd={(chip) => setTags([...tags, chip])}
                                onDelete={(chip) => {setTags(tags.filter((tag) => tag !== chip)); dispatch(getPosts(page))}}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={searchPost}>Search</Button>
                        </StyledAppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!search || /^\s*$/.test(search)) && (
                            <Paper elevation={6}>
                                <CustomPagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;