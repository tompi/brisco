exports.init = function(app, config, routes, passport, db) {

    var users = [];

    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        LinkedInStrategy = require('passport-linkedin').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.provider + "-" + user.id);
    });

    passport.deserializeUser(function(id, done) {
        var user = users[id];
        done(null, user);
    });

    function authenticatedUser(accessToken, refreshToken, profile, done) {
        var user = users[profile.provider + "-" + profile.id];
        if (!user) {
            db.findOrCreateUser(profile, function(dbUser) {
                user = dbUser;
                users[profile.provider + "-" + profile.id] = user;
                return done(null, user);
            });                
        } else {
            return done(null, user);
        }         
    }

    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL
    }, authenticatedUser));

    passport.use(new FacebookStrategy({
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: config.FACEBOOK_CALLBACK_URL
    }, authenticatedUser));

    passport.use(new LinkedInStrategy({
        consumerKey: config.LINKEDIN_API_KEY,
        consumerSecret: config.LINKEDIN_SECRET_KEY,
        callbackURL: config.LINKEDIN_CALLBACK_URL
    }, authenticatedUser));

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
    }));

    app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    }));

    app.get('/auth/linkedin', passport.authenticate('linkedin'));

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
