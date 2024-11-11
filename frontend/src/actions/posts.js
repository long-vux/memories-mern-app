import * as api from '../components/api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, FETCH_POST_DETAILS, ADD_IMAGE } from '../constants/actionTypes';

// action creators
export const getPosts = (page) => async (dispatch) => {
    try {
        const { data, currentPage, numberOfPages } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getPostDetails = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostDetails(id);
        dispatch({ type: FETCH_POST_DETAILS, payload: data });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const addImage = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.addImage(id, image);
        dispatch({ type: ADD_IMAGE, payload: data });
    } catch (error) {
        console.log(error);
    }
}