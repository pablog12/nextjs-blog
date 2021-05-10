import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { LogIn } from '@/state/main/actions';
import { selectToken, selectUserAccount } from '../state/main/mainSlice';

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

const handleClickLogIn = async (event) => {
    event.preventDefault();

    const dispatch = useDispatch();

    var user = 'admin@thaloz.com';
    var pass = 'admin';

    try {
        dispatch(LogIn({ username: user, password: pass }));
    } catch (error) {
        console.log(error);
    }
};

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector(selectToken);
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
            <ButtonLogIn onClick={handleClickLogIn}>Login</ButtonLogIn>
            <p>token: {token}</p>
        </div>
    );
}
