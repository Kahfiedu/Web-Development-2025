const env = {
    API_URL: import.meta.env.VITE_API_URL,
    ENV: import.meta.env.VITE_ENV,
    COOKIE_DOMAIN: import.meta.env.VITE_COOKIE_DOMAIN,
    IS_PRODUCTION: import.meta.env.VITE_ENV === 'production',
    IS_DEVELOPMENT: import.meta.env.VITE_ENV === 'development'
};

export default env;