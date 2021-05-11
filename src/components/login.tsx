import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserAccount, selectIsLoggedIn } from '../state/main/mainSlice';

import { dispatchLogIn, dispatchLogOut } from '../state/main/actions';
import { useRouter } from 'next/router';

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

const ButtonLogOut = styled(ButtonLogIn)`
    background-color: #af4c6a;
    &:hover {
        color: #af4c6a;
    }
`;

export function Login() {
    const [email, setEmail] = useState('admin@thaloz.com');
    const [password, setPassword] = useState('admin');

    const user = useSelector(selectUserAccount);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const dispatcher = useDispatch();
    const router = useRouter();

    const LogInClick = () => {
        dispatchLogIn(dispatcher, router, { username: email, password: password });
    };

    const LogOutClick = () => {
        dispatchLogOut(dispatcher, router);
    };

    let AuthButton;

    if (isLoggedIn) {
        AuthButton = <ButtonLogOut onClick={LogOutClick}>LogOut</ButtonLogOut>;
    } else {
        AuthButton = <ButtonLogIn onClick={LogInClick}>Login</ButtonLogIn>;
    }

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
            {AuthButton}
            {isLoggedIn ? <p>Logged in as: {user.email}</p> : <p>Not logged in</p>}
        </div>
    );
}
