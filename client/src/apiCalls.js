import { ENDPOINT } from './config';
import axios from 'axios';

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axios.post(
            `${ENDPOINT}/api/v1/users/login`,
            userCredential
        );
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        window.alert('Login Successfully');
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
    }
};

export const signUpCall = async (userCredential, dispatch) => {
    dispatch({ type: 'SIGNUP_START' });
    try {
        const res = await axios.post(
            `${ENDPOINT}/api/v1/users/signup`,
            userCredential
        );
        dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
        window.alert('Account created Successfully');
    } catch (err) {
        dispatch({ type: 'SIGNUP_FAILURE', payload: err });
    }
};
