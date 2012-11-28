 
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
    
    exports.start = renderFunction('start');
    
    exports.api = {};
    
    exports.api.findAllTournaments = function(req, res) {
        db.findAllTournaments(function(items) {res.send(items);});
    };
    exports.api.createTournament = function(req, res) {
        db.createTournament(req.user, function(tournamentId) {res.send(tournamentId);});
    };
    
    app.get('/', exports.index);
    app.get('/start', exports.start);
    
    app.get('/api/tournaments', ensureAuthenticated, exports.api.findAllTournaments);
    
    app.get('/api/createTournament', ensureAuthenticated, exports.api.createTournament);
 };
