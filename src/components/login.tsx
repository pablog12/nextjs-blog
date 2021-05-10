import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectToken,
    selectUserAccount,
    actionLogIn,
    actionGetUserAccount,
    setLogInError,
    setLoggedIn,
    addNotification
} from '../state/main/mainSlice';

import { unwrapResult } from '@reduxjs/toolkit';

const ButtonLogIn = styled.button`
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

export function Login() {
    const [email, setEmail] = useState('admin@thaloz.com');
    const [password, setPassword] = useState('admin');
    const token = useSelector(selectToken);
    const user = useSelector(selectUserAccount);
    const dispatch = useDispatch();

    const onLoginClicked = () => {
        dispatch(actionLogIn({ username: email, password: password }))
            .then(unwrapResult)
            .then(async (sucess) => {
                dispatch(setLoggedIn(true));
                dispatch(setLogInError(false));
                dispatch(actionGetUserAccount(sucess));
                // await RouteLoggedIn();
                dispatch(addNotification({ content: 'Logged in', color: 'success' }));
            })
            .catch((error) => {
                console.error('Failed to login: ', error);
                dispatch(setLogInError(true));
                // await LogOut();
            });
    };

    return (
        <div>
            <input
                type="text"
                name="email"
                placeholder="user"
                onChange={(e) => setEmail(e.target.value)}
                value={email}></input>
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}></input>
            <ButtonLogIn onClick={onLoginClicked}>Login</ButtonLogIn>
            <p>token: {token}</p>
        </div>
    );
}
