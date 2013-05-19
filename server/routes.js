var fs = require('fs');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('ISO-8859-1', 'UTF-8');
var pbnParser = require("../client/js/brisco/pbn/parser");

function renderFunction(view) {
    return function(req, res) {
        res.render(view, {
            user: req.user
        });
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

    app.get('/api/tournaments', ensureAuthenticated, function(req, res) {
        db.tournament.findAll(req.user, req.club, function(items) {
            res.send(items);
        });
    });
    app.get('/api/tournament/:tournamentId', function(req, res) {
        db.tournament.findById(req.params.tournamentId, req.club || 0, function(tournament) {
            res.send(tournament);
        });
    });
    app.get('/api/myaccount', ensureAuthenticated, function(req, res) {
        db.user.findById(req.user.id, function(item) {
            res.send(item);
        });
    });

    /*     app.get('/api/tournament/create', ensureAuthenticated, function(req, res) {
         db.tournament.create(req.user, req.body.name, req.club, function(tournamentId) {
             res.send(tournamentId);
         });
     });
*/

    app.post('/tournaments/upload', ensureAuthenticated, function(req, res) {
        if (req.files.length === 0 || req.files.file.size === 0) res.send('No file uploaded at ' + new Date().toString());
        else {
            var file = req.files.file;
            console.log(file);
            fs.readFile(file.path, function(err, data) {
                if (err) throw err;

                var tournament = pbnParser.parse(iconv.convert(data).toString('utf8'));
                db.tournament.upload(req.user, req.club, tournament, function(tournamentId) {
                    res.send("Saved tournament with id: " + tournamentId);
                });
            });
        }
    });
};