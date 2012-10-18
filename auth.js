exports.init = function(app, config, routes, passport) {

    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        LinkedInStrategy = require('passport-linkedin').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL
    },

    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // To keep the example simple, the user's Google profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Google account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }));

    passport.use(new FacebookStrategy({
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: config.FACEBOOK_CALLBACK_URL
    },

    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }));

    passport.use(new LinkedInStrategy({
        consumerKey: config.LINKEDIN_API_KEY,
        consumerSecret: config.LINKEDIN_SECRET_KEY,
        callbackURL: config.LINKEDIN_CALLBACK_URL
    },

    function(token, tokenSecret, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // To keep the example simple, the user's LinkedIn profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the LinkedIn account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }));


    app.get('/account-json', ensureAuthenticated, function(req, res) {
        res.json(req.user);
    });

    app.get('/login', function(req, res) {
        res.render('login', {
            user: req.user
        });
    });

    app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    }),

    function(req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
    });

    app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    }),

    function(req, res) {
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
    });



    app.get('/auth/linkedin',
    passport.authenticate('linkedin'),

    function(req, res) {
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/login'
    }), routes.start);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }), routes.start);

    app.get('/oauth2callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }), routes.start);

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

};
