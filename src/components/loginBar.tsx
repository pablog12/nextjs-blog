import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUserAccount, selectToken, selectUserAccount } from '../state/main/mainSlice';
import { api } from '@/api';
import { getHealth } from '../lib/apiHealth';
import styled from 'styled-components';

const ButtonUser = styled.button`
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
    transition-duration: 0.4s;
    margin: 5px;
    &:hover {
        background-color: white; /* Green */
        color: #4caf50;
        border: 1px solid;
    }
`;

const ButtonLogIn = styled(ButtonUser)`
    background-color: purple;
    &:hover {
        color: purple;
    }
`;

const ButtonHealth = styled(ButtonUser)`
    background-color: red;
    &:hover {
        color: red;
    }
`;

const handleClickLogIn = async (event) => {
    event.preventDefault();
    const dispatch = useDispatch();

    var user = 'admin@thaloz.com';
    var pass = 'admin';

    try {
        const resp = await api.logInGetToken(user, pass);
        console.log(resp.data.access_token);
        dispatch(setToken('123'));
    } catch (error) {
        console.log(error);
    }
};

const handleClickEnv = async (event) => {
    event.preventDefault();

    try {
        const resp = await api.getMe();
        console.log(resp);
    } catch (error) {
        console.log(error);
    }
};

const handleClickHealth = async (event) => {
    event.preventDefault();

    const resp = await getHealth();
    console.log(resp);
};

export function LoginBar() {
    const token = useSelector(selectToken);

    return (
        <div>
            <div>
                <ButtonLogIn onClick={handleClickLogIn}>Log In</ButtonLogIn>
                <span>{token}</span>
                <ButtonUser onClick={handleClickEnv}>Who am I</ButtonUser>
                <ButtonHealth onClick={handleClickHealth}>API Health</ButtonHealth>
            </div>
        </div>
    );
}
