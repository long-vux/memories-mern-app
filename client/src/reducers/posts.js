import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

// posts reducer function
const postsReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE:
        case LIKE:
            return state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
            };
        case CREATE:
            return [...state.posts, action.payload];
        case DELETE:
            return state.posts.filter((post) => post._id !== action.payload);
        default:
            return state;
    }
};

export default postsReducer;