 var fs = require('fs');
 var pbnParser = require("../public/js/brisco/pbn/parser");
 
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
         db.tournament.findAll(req.club, function(items) {
             res.send(items);
         });
     });
     app.get('/api/testTournament', function(req, res) {
         res.send(db.tournament.testTournament);
     });

     app.get('/api/tournament/create', ensureAuthenticated, function(req, res) {
         db.tournament.create(req.user, req.body.name, req.club, function(tournamentId) {
             res.send(tournamentId);
         });
     });

     app.post('/tournaments/upload', ensureAuthenticated, function(req, res) {
         if (req.files.length === 0 || req.files.file.size === 0) res.send('No file uploaded at ' + new Date().toString());
         else {
             var file = req.files.file;
             var path = file.path + '/' +  file.name;
             console.log(file);
             fs.readFile(file.path, function(err, data) {
                 if (err) throw err;
                 var tournament = pbnParser.parse(data.toString());
                 db.tournament.upload(req.user, req.club, tournament, function(tournamentId) {
                    res.send("Saved tournament with id: " + tournamentId);
                 });
             });
         }
     });
 };