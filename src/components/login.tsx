import React from 'react';
// import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserAccount,
    selectIsLoggedIn,
    selectLogInError,
    selectLogInErrMsg
} from '../state/main/mainSlice';

import { dispatchLogIn, dispatchLogOut } from '../state/main/actions';
import { useRouter } from 'next/router';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        margin: {
            margin: theme.spacing(1)
        },
        withoutLabel: {
            marginTop: theme.spacing(3)
        },
        textField: {
            width: '25ch'
        },
        errorLaber: {
            color: 'red'
        }
    })
);

interface State {
    password: string;
    username: string;
    showPassword: boolean;
}

export function Login() {
    const user = useSelector(selectUserAccount);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const logInError = useSelector(selectLogInError);
    const logInErrMsg = useSelector(selectLogInErrMsg);
    const [values, setValues] = React.useState<State>({
        password: 'admin',
        username: 'admin@thaloz.com',
        showPassword: false
    });

    const classes = useStyles();

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Dispatcher and Router for the Redux store actions.
    const dispatcher = useDispatch();
    const router = useRouter();

    const LogInClick = async () => {
        dispatchLogIn(dispatcher, router, {
            username: values.username,
            password: values.password
        });
    };
    const LogOutClick = () => {
        dispatchLogOut(dispatcher, router);
    };

    function LoginForm() {
        if (!isLoggedIn) {
            return (
                <>
                    <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined">
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            value={values.username}
                            onChange={handleChange('username')}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                            labelWidth={75}
                        />
                    </FormControl>
                    <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={75}
                        />
                    </FormControl>
                </>
            );
        } else {
            return null;
        }
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <LoginForm />
            {isLoggedIn ? (
                <Button variant="contained" color="secondary" size="large" onClick={LogOutClick}>
                    LogOut
                </Button>
            ) : (
                <Button variant="contained" color="primary" size="large" onClick={LogInClick}>
                    Login
                </Button>
            )}
            <Grid container direction="column" justify="center" alignItems="center">
                {isLoggedIn ? (
                    <Typography variant="caption" gutterBottom>
                        Logged in as: {user ? user.email : ''}
                    </Typography>
                ) : (
                    <Typography variant="caption" gutterBottom>
                        Not logged in
                    </Typography>
                )}

                {logInError ? (
                    <Typography variant="caption" className={clsx(classes.errorLaber)} gutterBottom>
                        {logInErrMsg}
                    </Typography>
                ) : (
                    <></>
                )}
            </Grid>
        </Grid>
    );
}
