import { createSlice } from '@reduxjs/toolkit';
import { MainState } from './state';

const initialState: MainState = {
    isLoggedIn: null,
    token: '',
    logInError: false,
    userAccount: null,
    userProfile: null,
    dashboardMiniDrawer: false,
    dashboardShowDrawer: true,
    notifications: []
};

export const slice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setToken: (state: MainState, action: any) => {
            state.token = action.payload;
        },
        setLoggedIn: (state: MainState, action: any) => {
            state.isLoggedIn = action.payload;
        },
        setLogInError: (state: MainState, action: any) => {
            state.logInError = action.payload;
        },
        setUserAccount: (state: MainState, action: any) => {
            state.userAccount = action.payload;
        },
        setUserProfile: (state: MainState, action: any) => {
            state.userProfile = action.payload;
        },
        setDashboardMiniDrawer: (state: MainState, action: any) => {
            state.dashboardMiniDrawer = action.payload;
        },
        setDashboardShowDrawer: (state: MainState, action: any) => {
            state.dashboardShowDrawer = action.payload;
        },
        addNotification: (state: MainState, action: any) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state: MainState, action: any) => {
            state.notifications = state.notifications.filter(
                (notification) => notification !== action.payload
            );
        }
    }
});

export const {
    setToken,
    setLoggedIn,
    setLogInError,
    setUserAccount,
    setUserProfile,
    setDashboardMiniDrawer,
    setDashboardShowDrawer,
    addNotification,
    removeNotification
} = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsLoggedIn = (state) => state.main.isLoggedIn;
export const selectToken = (state) => state.main.token;
export const selectLogInError = (state) => state.main.logInError;
export const selectUserAccount = (state) => state.main.userAccount;
export const selectUserProfile = (state) => state.main.userProfile;
export const selectDashboardMiniDrawer = (state) => state.main.dashboardMiniDrawer;
export const selectDashboardShowDrawer = (state) => state.main.dashboardShowDrawer;
export const selectNotifications = (state) => state.main.notifications;
export const selectHasAdminAccess = (state) => {
    return (
        state.main.userAccount &&
        state.main.userAccount.is_superuser &&
        state.main.userAccount.is_active
    );
};

export default slice.reducer;
