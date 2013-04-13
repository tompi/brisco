var tracking = require("./tracking");

exports.init = function(mongoClient) {
    var me = {};
    
    me.create = function(user, name, next) {
        var club = tracking.trackObject(user, {});
        club.name = name;
        mongoClient.collection('clubs').insert(club, {
            safe: true
        }, function(err, result) {
            next(result[0]._id);
        });
    };


    return me;
};
