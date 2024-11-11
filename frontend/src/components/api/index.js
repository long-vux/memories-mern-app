import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost/api' });

// Add token to the request headers if the user is authenticated (use for checking middleware)
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id, updatedPost) => API.patch(`/posts/${id}/likePost`, updatedPost);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
export const fetchPostDetails = (id) => API.get(`/posts/${id}`);
export const addImage = (id, image) => API.patch(`/posts/${id}/addImage`, { image });

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);