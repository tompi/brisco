 var fs = require('fs');
 
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

     app.post('/tournaments/upload', function(req, res) {
         res.setHeader('Content-Type', 'text/html');
         if (req.files.length === 0 || req.files.file.size === 0) res.send('No file uploaded at ' + new Date().toString());
         else {
             var file = req.files.file;
             fs.unlink(file.path, function(err) {
                 if (err) throw err;
                 else res.send('<b>"' + file.name + '"<b> uploaded to the server at ' + new Date().toString());
             });
         }
     });
 };