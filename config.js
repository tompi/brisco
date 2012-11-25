var debug = typeof process.env.C9_PORT !== "undefined";

var LOCAL_URL = debug ? "http://brisco.tompi.c9.io" : "http://dupliscore.herokuapp.com";

var config = {
    GOOGLE_CLIENT_ID: "741005313984.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "-Hiq3gWKdcdR2812CbEZz3rA",
    GOOGLE_CALLBACK_URL: LOCAL_URL + "/oauth2callback",
    
    FACEBOOK_APP_ID: "467889913242015",
    FACEBOOK_APP_SECRET: "6f75a105bfcceeca498c1b541a2b0d22",
    FACEBOOK_CALLBACK_URL: LOCAL_URL + "/auth/facebook/callback", 
    
    LINKEDIN_API_KEY: "4tc649z2zup3",
    LINKEDIN_SECRET_KEY: "PekXOOYUQrRTcqFN",
    LINKEDIN_CALLBACK_URL: LOCAL_URL + "/auth/linkedin/callback", 
    
    COOKIE_SECRET: "EAEW62JRUFS70+TRWQ1232",
    
    REDIS_HOST: "ray.redistogo.com",
    REDIS_PORT: "9541",
    REDIS_PASSWORD: "67ccc17f54b22b57598efb51503c85ea"
};

var config_debug = {
    GOOGLE_CLIENT_ID: "741005313984-so4e98sl2uvdnj12fkqi86bnd3a2rfbj.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "YzhOEwB6s0KIN8mZW1yhQYsA",
    GOOGLE_CALLBACK_URL: LOCAL_URL + "/oauth2callback",
    
    FACEBOOK_APP_ID: "467889913242015",
    FACEBOOK_APP_SECRET: "6f75a105bfcceeca498c1b541a2b0d22",
    FACEBOOK_CALLBACK_URL: LOCAL_URL + "/auth/facebook/callback", 
    
    LINKEDIN_API_KEY: "4tc649z2zup3",
    LINKEDIN_SECRET_KEY: "PekXOOYUQrRTcqFN",
    LINKEDIN_CALLBACK_URL: LOCAL_URL + "/auth/linkedin/callback",     
    
    COOKIE_SECRET: "EAEW62JRUFS70+TRWQ1232",
    
    REDIS_HOST: "ray.redistogo.com",
    REDIS_PORT: "9541",
    REDIS_PASSWORD: "67ccc17f54b22b57598efb51503c85ea"
}    

module.exports = debug ? config_debug : config;