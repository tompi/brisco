/**
 * Module dependencies.
 */

var express = require('express'),
    locals = require('ejs-locals'),
    routes = require('./routes'),
    config = require('./config'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    auth = require('./auth'),
    db = require('./db/db');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.engine('ejs', locals);
    app.locals._layoutFile = 'layout.ejs';
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
    app.use(express['static'](path.join(__dirname, 'public')));
});

var db = db.init(app, config);

routes.setupRoutes(app, db);
auth.init(app, config, routes, passport, db);

app.configure('development', function() {
    app.use(express.errorHandler());
});


http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

