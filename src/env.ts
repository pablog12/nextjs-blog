const env = process.env.FRONTEND_APP_ENV;

let envApiUrl = '';

if (env === 'production') {
    envApiUrl = `https://${process.env.FRONTEND_APP_DOMAIN_PROD}`;
} else if (env === 'staging') {
    envApiUrl = `https://${process.env.FRONTEND_APP_DOMAIN_STAG}`;
} else {
    envApiUrl = `http://${process.env.FRONTEND_APP_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl;
export const appName = process.env.PROJECT_NAME;
export const appVersion = process.env.PROJECT_VERSION;
