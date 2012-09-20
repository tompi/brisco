
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'DupliScore' });
};

exports.start = function(req, res) {
    res.render('start');
};