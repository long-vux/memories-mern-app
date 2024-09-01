import * as api from '../components/api';
import { SIGNIN, SIGNUP } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        console.log(data);
        dispatch({ type: SIGNIN, data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        await api.signup(formData);
        dispatch({ type: SIGNUP });

        navigate('/auth');
    } catch (error) {
        console.log(error);
    }
}