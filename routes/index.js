 
function renderFunction(view) {
     return function(req, res) {
         res.render(view, { user: req.user });
     };
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.statusCode = 401;
    res.end();
}

exports.setupRoutes = function(app, db) {
    exports.index = renderFunction('index');
    app.get('/', exports.index);
    exports.start = renderFunction('start');
    app.get('/start', exports.start);
    
    app.get('/api/tournament/findAll', ensureAuthenticated, function(req, res) {
        db.tournament.findAll(function(items) {res.send(items);});
    });
    
    app.get('/api/tournament/create', ensureAuthenticated, function(req, res) {
        db.tournament.create(req.user, function(tournamentId) {res.send(tournamentId);});
    });
 };
