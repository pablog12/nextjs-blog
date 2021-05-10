import { api } from '@/api';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
    addNotification,
    removeNotification,
    setLoggedIn,
    setLogInError,
    setToken,
    setUserAccount,
    setUserProfile
} from './mainSlice';
import { selectToken, selectIsLoggedIn, selectUserAccount } from './mainSlice';
import { AppNotification } from './state';
import { useRouter } from 'next/router';

export const actions = {
    async actionLogIn(payload: { username: string; password: string }) {
        try {
            const response = await api.logInGetToken(payload.username, payload.password);
            const token = response.data.access_token;
            if (token) {
                saveLocalToken(token);
                setToken(token);
                setLoggedIn(true);
                setLogInError(false);
                await dispatchGetUserAccount();
                await dispatchRouteLoggedIn();
                addNotification({ content: 'Logged in', color: 'success' });
            } else {
                await dispatchLogOut();
            }
        } catch (err) {
            setLogInError(true);
            await dispatchLogOut();
        }
    },
    async actionGetUserAccount() {
        try {
            const response = await api.getMe(useSelector(selectToken));
            if (response.data) {
                setUserAccount(response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(error);
        }
    },
    async actionUpdateUserAccount(payload) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            addNotification(loadingNotification);
            const response = (
                await Promise.all([
                    api.updateMe(useSelector(selectToken), payload),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            setUserAccount(response.data);
            removeNotification(loadingNotification);
            addNotification({
                content: 'Account successfully updated',
                color: 'success'
            });
        } catch (error) {
            await dispatchCheckApiError(error);
        }
    },
    async actionUpdateUserProfile(payload) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            addNotification(loadingNotification);
            const profileId = useSelector(selectUserAccount).profile[0].id;
            const response = (
                await Promise.all([
                    api.updateProfile(useSelector(selectToken), profileId, payload),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            setUserProfile(response.data);
            removeNotification(loadingNotification);
            addNotification({
                content: 'Profile successfully updated',
                color: 'success'
            });
        } catch (error) {
            await dispatchCheckApiError(error);
        }
    },
    async actionCheckLoggedIn() {
        if (!useSelector(selectIsLoggedIn)) {
            let token = useSelector(selectToken);
            if (!token) {
                const localToken = getLocalToken();
                if (localToken) {
                    setToken(localToken);
                    token = localToken;
                }
            }
            if (token) {
                try {
                    const response = await api.getMe(token);
                    setLoggedIn(true);
                    setUserAccount(response.data);
                } catch (error) {
                    await dispatchRemoveLogIn();
                }
            } else {
                await dispatchRemoveLogIn();
            }
        }
    },
    async actionRemoveLogIn() {
        removeLocalToken();
        setToken('');
        setLoggedIn(false);
    },
    async actionLogOut() {
        await dispatchRemoveLogIn();
        await dispatchRouteLogOut();
    },
    async actionUserLogOut() {
        await dispatchLogOut();
        addNotification({ content: 'Logged out', color: 'success' });
    },
    actionRouteLogOut() {
        const router = useRouter();
        if (router.pathname !== '/login') {
            router.push('/login');
        }
    },
    async actionCheckApiError(payload: AxiosError) {
        if (payload.response!.status === 401) {
            await dispatchLogOut();
        }
    },
    actionRouteLoggedIn() {
        const router = useRouter();
        if (router.pathname === '/login' || router.pathname === '/') {
            router.push('/main');
        }
    },
    async removeNotification(payload: { notification: AppNotification; timeout: number }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                removeNotification(payload.notification);
                resolve(true);
            }, payload.timeout);
        });
    },
    async passwordRecovery(payload: { username: string }) {
        const loadingNotification = {
            content: 'Sending password recovery email',
            showProgress: true
        };
        try {
            addNotification(loadingNotification);
            const response = (
                await Promise.all([
                    api.passwordRecovery(payload.username),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            removeNotification(loadingNotification);
            addNotification({
                content: 'Password recovery email sent',
                color: 'success'
            });
            await dispatchLogOut();
        } catch (error) {
            removeNotification(loadingNotification);
            addNotification({ color: 'error', content: 'Incorrect username' });
        }
    },
    async resetPassword(payload: { password: string; token: string }) {
        const loadingNotification = { content: 'Resetting password', showProgress: true };
        try {
            addNotification(loadingNotification);
            const response = (
                await Promise.all([
                    api.resetPassword(payload.password, payload.token),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            removeNotification(loadingNotification);
            addNotification({
                content: 'Password successfully reset',
                color: 'success'
            });
            await dispatchLogOut();
        } catch (error) {
            removeNotification(loadingNotification);
            addNotification({ color: 'error', content: 'Error resetting password' });
        }
    }
};

const dispatch = useDispatch();

export const dispatchCheckApiError = dispatch(actions.actionCheckApiError);
export const dispatchCheckLoggedIn = dispatch(actions.actionCheckLoggedIn);
export const dispatchGetUserAccount = dispatch(actions.actionGetUserAccount);
export const dispatchLogIn = dispatch(actions.actionLogIn);
export const dispatchLogOut = dispatch(actions.actionLogOut);
export const dispatchUserLogOut = dispatch(actions.actionUserLogOut);
export const dispatchRemoveLogIn = dispatch(actions.actionRemoveLogIn);
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn);
export const dispatchRouteLogOut = dispatch(actions.actionRouteLogOut);
export const dispatchUpdateUserAccount = dispatch(actions.actionUpdateUserAccount);
export const dispatchUpdateUserProfile = dispatch(actions.actionUpdateUserProfile);
export const dispatchremoveNotification = dispatch(actions.removeNotification);
export const dispatchPasswordRecovery = dispatch(actions.passwordRecovery);
export const dispatchResetPassword = dispatch(actions.resetPassword);
