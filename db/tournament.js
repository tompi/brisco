exports.init = function(mongoClient) {

    var me = {};

    me.create = function(userId, next) {
        mongoClient.collection('tournaments').insert({
            createdBy: userId,
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
