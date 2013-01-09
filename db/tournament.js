exports.init = function(mongoClient) {

    var me = {};

    me.create = function(user, name, club, next) {
        mongoClient.collection('tournaments').insert({
            createdBy: user._id,
            createdTime: new Date(),
            name: name,
            club: club || 0,
            pairs: []
        }, {
            safe: true
        }, function(err, result) {
            next(result[0]._id);
        });
    };

    me.findAll = function(club, next) {
        mongoClient.collection('tournaments').find({'club': club}).toArray(function(err, items) {
            next(items);
        });
    };

    me.findById = function(id, club, next) {
        mongoClient.collection('tournaments').find({'_id': id, 'club': club}).each(function(err, item) {
            next(item);
        });
    };

    return me;
};
