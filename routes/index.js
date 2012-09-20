
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'DupliScore' });
};

exports.loggedin = function(req, res) {
     res.redirect('/account-json');
  };