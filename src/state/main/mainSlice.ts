import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MainState } from './state';
import { api } from '@/api';
import { removeLocalToken, saveLocalToken } from '@/utils';
import { IUserAccount } from '../../interfaces';

const initialState: MainState = {
    isLoggedIn: null,
    token: '',
    logInError: false,
    logInErrMsg: '',
    userAccount: null,
    userProfile: null,
    dashboardMiniDrawer: false,
    dashboardShowDrawer: true,
    notifications: []
};

interface TokenResponse {
    token: string;
    error: boolean;
    error_message: string;
}

interface UserAccResponse {
    userAcc: any;
    error: boolean;
    error_message: string;
}

// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched

export const commitGetToken = createAsyncThunk(
    'auth/Login',
    async (payload: { username: string; password: string }) => {
        try {
            const response = await api.logInGetToken(payload.username, payload.password);
            const token = response.data.access_token;
            saveLocalToken(token);
            return { token: token, error: false, error_message: null };
        } catch (err) {
            return { token: null, error: true, error_message: err.name + ' ' + err.message };
        }
    }
);

export const commitGetUserAccount = createAsyncThunk(
    'user/GetAccount',
    async (userToken: string) => {
        try {
            const response = await api.getMe(userToken);
            return { userAcc: response, error: false, error_message: null };
        } catch (err) {
            return { userAcc: null, error: true, error_message: err.name + ' ' + err.message };
        }
    }
);

export const commitRemoveLogIn = createAsyncThunk('user/RemoveLogIn', async () => {
    try {
        removeLocalToken();
    } catch (err) {
        console.error('Failed to remove login: ', err);
        return err;
    }
});

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
        setLogInErrMsg: (state: MainState, action: any) => {
            state.logInErrMsg = action.payload;
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
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [commitGetToken.fulfilled.toString()]: (state, action: PayloadAction<TokenResponse>) => {
            state.token = action.payload.token;
        },
        [commitGetUserAccount.fulfilled.toString()]: (
            state,
            action: PayloadAction<UserAccResponse>
        ) => {
            // Add user to the state array
            const userAccountInfo: IUserAccount = {
                email: '',
                full_name: '',
                id: null,
                is_active: null,
                is_superuser: null
            };

            userAccountInfo.email = action.payload.userAcc.data.email;
            userAccountInfo.full_name = action.payload.userAcc.data.full_name;
            userAccountInfo.id = action.payload.userAcc.data.id;
            userAccountInfo.is_active = action.payload.userAcc.data.is_active;
            userAccountInfo.is_superuser = action.payload.userAcc.data.is_superuser;

            state.userAccount = userAccountInfo;
        },
        [commitRemoveLogIn.fulfilled.toString()]: (state) => {
            state.token = '';
            state.isLoggedIn = false;
        }
    }
});

export const {
    setToken,
    setLoggedIn,
    setLogInError,
    setLogInErrMsg,
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
export const selectLogInErrMsg = (state) => state.main.logInErrMsg;
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
export const selectFirstNotification = (state) => {
    return state.main.notifications.length > 0 && state.main.notifications[0];
};
export default slice.reducer;
