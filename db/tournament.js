exports.init = function(mongoClient) {

    var me = {};

    me.create = function(user, next) {
        mongoClient.collection('tournaments').insert({
            createdBy: user._id,
            createdTime: new Date(),
            pairs: []
        }, {
            safe: true
        }, function(err, result) {
            next(result[0]._id);
        });
    };

    me.findAll = function(next) {
        mongoClient.collection('tournaments').find().toArray(function(err, items) {
            next(items);
        });
    };

    me.findById = function(id, next) {
        mongoClient.collection('tournaments').find({'_id': id}).each(function(err, item) {
            next(item);
        });
    };

    

    return me;
};
