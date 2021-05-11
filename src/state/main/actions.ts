import { api } from '@/api';
import { getLocalToken, removeLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import {
    addNotification,
    removeNotification,
    setLoggedIn,
    setLogInError,
    setToken,
    setUserAccount,
    setUserProfile,
    commitGetToken
} from './mainSlice';
import { selectToken, selectIsLoggedIn, selectUserAccount } from './mainSlice';
import { AppNotification } from './state';
import { unwrapResult } from '@reduxjs/toolkit';

export const actions = {
    dispatchRouteLoggedIn(router) {
        if (router.pathname === '/login' || router.pathname === '/') {
            router.push('/main');
        }
    },
    dispatchRouteLogOut(router) {
        if (router.pathname !== '/') {
            router.push('/');
        }
    },
    async dispatchLogIn(dispatcher, router, payload: { username: string; password: string }) {
        dispatcher(commitGetToken({ username: payload.username, password: payload.password }))
            .then(unwrapResult)
            .then(async (result) => {
                if (result) {
                    dispatcher(setLoggedIn(true));
                    dispatcher(setLogInError(false));
                    await dispatchGetUserAccount(dispatcher, router, result);
                    // await dispatchRouteLoggedIn(router);
                    dispatcher(addNotification({ content: 'Logged in', color: 'success' }));
                }
            })
            .catch((error) => {
                console.error('Failed to login: ', error);
                dispatcher(setLogInError(true));
                dispatchLogOut(dispatcher, router);
            });
    },
    async dispatchGetUserAccount(dispatcher, router, token) {
        try {
            const response = await api.getMe(token);
            if (response.data) {
                dispatcher(setUserAccount(response.data));
            }
        } catch (error) {
            await dispatchCheckApiError(dispatcher, router, error);
        }
    },
    async dispatchUpdateUserAccount(dispatcher, router, payload) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            dispatcher(addNotification(loadingNotification));
            const response = (
                await Promise.all([
                    api.updateMe(useSelector(selectToken), payload),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            dispatcher(setUserAccount(response.data));
            dispatcher(removeNotification(loadingNotification));
            dispatcher(
                addNotification({
                    content: 'Account successfully updated',
                    color: 'success'
                })
            );
        } catch (error) {
            await dispatchCheckApiError(dispatcher, router, error);
        }
    },
    async dispatchUpdateUserProfile(dispatcher, router, payload) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            dispatcher(addNotification(loadingNotification));
            const profileId = useSelector(selectUserAccount).profile[0].id;
            const response = (
                await Promise.all([
                    api.updateProfile(useSelector(selectToken), profileId, payload),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            dispatcher(setUserProfile(response.data));
            dispatcher(removeNotification(loadingNotification));
            dispatcher(
                addNotification({
                    content: 'Profile successfully updated',
                    color: 'success'
                })
            );
        } catch (error) {
            await dispatchCheckApiError(dispatcher, router, error);
        }
    },
    async dispatchCheckLoggedIn(dispatcher) {
        if (!useSelector(selectIsLoggedIn)) {
            let token = useSelector(selectToken);
            if (!token) {
                const localToken = getLocalToken();
                if (localToken) {
                    dispatcher(setToken(localToken));
                    token = localToken;
                }
            }
            if (token) {
                try {
                    const response = await api.getMe(token);
                    dispatcher(setLoggedIn(true));
                    dispatcher(setUserAccount(response.data));
                } catch (error) {
                    await dispatchRemoveLogIn(dispatcher);
                }
            } else {
                await dispatchRemoveLogIn(dispatcher);
            }
        }
    },
    async dispatchRemoveLogIn(dispatcher) {
        removeLocalToken();
        dispatcher(setToken(''));
        dispatcher(setLoggedIn(false));
    },
    async dispatchLogOut(dispatcher, router) {
        await dispatchRemoveLogIn(dispatcher);
        await dispatchRouteLogOut(router);
    },
    async dispatchUserLogOut(dispatcher, router) {
        await dispatchLogOut(dispatcher, router);
        dispatcher(addNotification({ content: 'Logged out', color: 'success' }));
    },
    async CheckApiError(dispatcher, router, payload: AxiosError) {
        if (payload.response!.status === 401) {
            await dispatchLogOut(dispatcher, router);
        }
    },
    async dispatchRemoveNotification(
        dispatcher,
        payload: {
            notification: AppNotification;
            timeout: number;
        }
    ) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatcher(removeNotification(payload.notification));
                resolve(true);
            }, payload.timeout);
        });
    },
    async dispatchPasswordRecovery(dispatcher, router, payload: { username: string }) {
        const loadingNotification = {
            content: 'Sending password recovery email',
            showProgress: true
        };
        try {
            dispatcher(addNotification(loadingNotification));
            const response = (
                await Promise.all([
                    api.passwordRecovery(payload.username),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            dispatcher(removeNotification(loadingNotification));
            dispatcher(
                addNotification({
                    content: 'Password recovery email sent',
                    color: 'success'
                })
            );
            await dispatchLogOut(dispatcher, router);
        } catch (error) {
            dispatcher(removeNotification(loadingNotification));
            dispatcher(addNotification({ color: 'error', content: 'Incorrect username' }));
        }
    },
    async dispatchResetPassword(dispatcher, router, payload: { password: string; token: string }) {
        const loadingNotification = { content: 'Resetting password', showProgress: true };
        try {
            dispatcher(addNotification(loadingNotification));
            const response = (
                await Promise.all([
                    api.resetPassword(payload.password, payload.token),
                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500))
                ])
            )[0];
            dispatcher(removeNotification(loadingNotification));
            dispatcher(
                addNotification({
                    content: 'Password successfully reset',
                    color: 'success'
                })
            );
            await dispatchLogOut(dispatcher, router);
        } catch (error) {
            dispatcher(removeNotification(loadingNotification));
            dispatcher(addNotification({ color: 'error', content: 'Error resetting password' }));
        }
    }
};

export const dispatchCheckLoggedIn = actions.dispatchCheckLoggedIn;
export const dispatchGetUserAccount = actions.dispatchGetUserAccount;
export const dispatchLogIn = actions.dispatchLogIn;
export const dispatchLogOut = actions.dispatchLogOut;
export const dispatchUserLogOut = actions.dispatchUserLogOut;
export const dispatchRemoveLogIn = actions.dispatchRemoveLogIn;
export const dispatchRouteLoggedIn = actions.dispatchRouteLoggedIn;
export const dispatchRouteLogOut = actions.dispatchRouteLogOut;
export const dispatchUpdateUserAccount = actions.dispatchUpdateUserAccount;
export const dispatchUpdateUserProfile = actions.dispatchUpdateUserProfile;
export const dispatchRemoveNotification = actions.dispatchRemoveNotification;
export const dispatchPasswordRecovery = actions.dispatchPasswordRecovery;
export const dispatchResetPassword = actions.dispatchResetPassword;
export const dispatchCheckApiError = actions.CheckApiError;
