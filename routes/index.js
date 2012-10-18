
/*
 * GET home page.
 */
 
 function renderFunction(view) {
     return function(req, res) {
         res.render(view, { user: req.user });
     };
 }

exports.index = renderFunction('index');

exports.start = renderFunction('start');