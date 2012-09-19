/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    config = require('./config'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
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

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(config.COOKIE_SECRET));
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.get('/account', ensureAuthenticated, function(req, res) {
    res.render('account', {
        user: req.user
    });
});

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

app.get('/oauth2callback',
passport.authenticate('google', {
    failureRedirect: '/login'
}),
function(req, res) {
    res.redirect('/account-json');
});

app.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/account-json');
  });

app.get('/auth/facebook/callback',
passport.authenticate('facebook', {failureRedirect: '/login'}),
                        function(req, res) {
                            res.redirect('/account-json');
                        });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
