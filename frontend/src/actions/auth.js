import * as api from '../components/api';
import { SIGNIN, SIGNUP, LOGOUT  } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        console.log(data);
        dispatch({ type: SIGNIN, data });
        navigate('/');
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        await api.signup(formData);
        dispatch({ type: SIGNUP });

        navigate('/auth');
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const logout = () => async (dispatch) => {
    await api.logout();
    dispatch({ type: LOGOUT });
    
}
