import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppNotification } from '../state/main/state';

import { dispatchRemoveNotification } from '../state/main/actions';
import { selectFirstNotification, removeNotification } from '../state/main/mainSlice';
import { useSelector, useDispatch } from 'react-redux';

interface State {
    show: boolean;
    text: string;
    showProgress: boolean;
    currentNotification: AppNotification;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    }
}));

export default function NotificationsManager() {
    const classes = useStyles();
    const dispatcher = useDispatch();
    const topNotification = useSelector(selectFirstNotification);
    const [values, setValues] = React.useState<State>({
        show: false,
        text: '',
        showProgress: false,
        currentNotification: null
    });

    async function hide() {
        setValues({ ...values, show: false });
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            dispatcher(removeNotification({ notification: values.currentNotification }));
            return;
        }
    };

    async function firstNotification() {
        return topNotification;
    }

    async function setNotification(notification: AppNotification | null) {
        console.log(notification);
        if (values.show) {
            await hide();
        }
        if (notification) {
            setValues({ ...values, currentNotification: notification });
            setValues({ ...values, showProgress: notification.showProgress || false });
            setValues({ ...values, show: true });
        } else {
            setValues({ ...values, currentNotification: null });
        }
    }

    async function onNotificationChange(
        newNotification: AppNotification | null,
        oldNotification: AppNotification | null
    ) {
        if (newNotification !== oldNotification) {
            await setNotification(newNotification);
            if (newNotification) {
                dispatchRemoveNotification(dispatcher, {
                    notification: newNotification,
                    timeout: 6500
                });
            }
        }
    }

    // This loads the notifications.
    useEffect(() => {
        (async function LoadNotifications() {
            setNotification(topNotification);
        })();
    }, [topNotification]);

    type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;

    function CurrentNotificationContent() {
        const result = values.currentNotification ? values.currentNotification.content : '';
        return <>{result}</>;
    }

    function CurrentNotificationColor() {
        // return (values.currentNotification.color as Severity) || 'info';
        return 'info' as Severity;
    }

    return (
        <div className={classes.root}>
            <Snackbar open={values.show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    <CurrentNotificationContent />
                </Alert>
            </Snackbar>
        </div>
    );
}
