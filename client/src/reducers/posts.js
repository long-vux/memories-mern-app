import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, FETCH_POST_DETAILS, ADD_IMAGE } from '../constants/actionTypes';

const initialState = {
    posts: [],
    postDetails: null,
}

// posts reducer function
const postsReducer = (state = initialState, action) => {
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
        case FETCH_POST_DETAILS:
            return {
                ...state,
                postDetails: action.payload,
            };
        case ADD_IMAGE:
            return {
                ...state,
                postDetails: {
                    ...state.postDetails,
                    images: [...state.postDetails.images, action.payload.image],
                },
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