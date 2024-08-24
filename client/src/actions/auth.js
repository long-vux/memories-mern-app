import * as api from '../components/api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        console.log(data);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        console.log(data);
        dispatch({ type: AUTH, data });

        navigate('/auth');
    } catch (error) {
        console.log(error);
    }
}