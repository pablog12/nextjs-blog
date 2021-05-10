module.exports = {
    reactStrictMode: true,
    env: {
        PROJECT_NAME: process.env.PROJECT_NAME,
        PROJECT_VERSION: process.env.PROJECT_VERSION,
        FRONTEND_APP_DOMAIN_PROD: process.env.FRONTEND_APP_DOMAIN,
        FRONTEND_APP_DOMAIN_STAG: process.env.FRONTEND_APP_DOMAIN_STAG,
        FRONTEND_APP_DOMAIN_DEV: process.env.FRONTEND_APP_DOMAIN_DEV,
        FRONTEND_APP_NAME: process.env.FRONTEND_APP_NAME,
        FRONTEND_APP_ENV: process.env.FRONTEND_APP_ENV
    }
};
