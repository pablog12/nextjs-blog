import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { dispatchResetPassword } from '../state/main/actions';
import { addNotification } from '../state/main/mainSlice';

interface State {
    password: string;
    passwordConfirmation: string;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://thaloz.com/">
                Thaloz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/collection/2077231/1600x900)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignInSide() {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        password: '',
        passwordConfirmation: ''
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Dispatcher and Router for the Redux store actions.
    const dispatcher = useDispatch();
    const router = useRouter();

    const onChangePassword = async () => {
        const token = await checkToken();
        if (token) {
            const validForm = await validateForm();
            if (validForm) {
                dispatchResetPassword(dispatcher, router, {
                    password: values.password,
                    token: checkToken()
                });
                router.push('/');
            } else {
                dispatcher(addNotification({ content: 'Passwords do not match', color: 'error' }));
            }
        }
    };

    const validateForm = () => {
        if (values.password === values.passwordConfirmation) {
            return true;
        } else {
            return false;
        }
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
    };

    const checkToken = () => {
        const token = router.query.token as string;
        if (!token) {
            dispatcher(
                addNotification({
                    content: 'No token provided in the URL, start a new password recovery',
                    color: 'error'
                })
            );
            router.push('/recover-password');
        } else {
            return token;
        }
    };

    // How useEffect() works:
    // -- Takes in a function
    // -- Returns nothing
    // -- Executed after every render cycle (both the render and every re-render)
    useEffect(() => {
        checkToken;
    }, [onSubmit]);

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <RotateLeftIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Password reset
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange('password')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password_confirmation"
                            label="Password confirmation"
                            type="password"
                            id="password_confirmation"
                            value={values.passwordConfirmation}
                            onChange={handleChange('passwordConfirmation')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onChangePassword}
                            className={classes.submit}>
                            Change password
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    {'Sign In'}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
