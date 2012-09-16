var debug = typeof process.env.C9_PORT !== "undefined";

var LOCAL_URL = debug ? "http://brisco.tompi.c9.io" : "http://dupliscore.herokuapp.com";

var config = {
    GOOGLE_CLIENT_ID: "741005313984.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "-Hiq3gWKdcdR2812CbEZz3rA",
    GOOGLE_CALLBACK_URL: LOCAL_URL + "/oauth2callback",
    
    FACEBOOK_APP_ID: "467889913242015",
    FACEBOOK_APP_SECRET: "6f75a105bfcceeca498c1b541a2b0d22",
    FACEBOOK_CALLBACK_URL: LOCAL_URL + "/auth/facebook/callback", 
    
    COOKIE_SECRET: "EAEW62JRUFS70+TRWQ1232"
};

var config_debug = {
    GOOGLE_CLIENT_ID: "741005313984-so4e98sl2uvdnj12fkqi86bnd3a2rfbj.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "YzhOEwB6s0KIN8mZW1yhQYsA",
    GOOGLE_CALLBACK_URL: LOCAL_URL + "/oauth2callback",
    
    FACEBOOK_APP_ID: "467889913242015",
    FACEBOOK_APP_SECRET: "6f75a105bfcceeca498c1b541a2b0d22",
    FACEBOOK_CALLBACK_URL: LOCAL_URL + "/auth/facebook/callback", 
    
    COOKIE_SECRET: "EAEW62JRUFS70+TRWQ1232"
}    

module.exports = debug ? config_debug : config;