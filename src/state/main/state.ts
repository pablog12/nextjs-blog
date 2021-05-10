import { IUserAccount, IUserProfile } from '@/interfaces';

export interface AppNotification {
    content: string;
    color?: string;
    showProgress?: boolean;
}

export interface MainState {
    token: string;
    isLoggedIn: boolean | null;
    logInError: boolean;
    userAccount: IUserAccount | null;
    userProfile: IUserProfile | null;
    dashboardMiniDrawer: boolean;
    dashboardShowDrawer: boolean;
    notifications: AppNotification[];
}
