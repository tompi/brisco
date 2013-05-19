var cache = require('../cache');
var Q = require('q');
var ObjectID = require('mongodb').ObjectID;

exports.init = function(client) {

    var me = {};

    me.findOrCreate = function(profile, next) {
        client.collection('users', function(err, collection) {
            // Try to find existing user with matching provider+id
            collection.findOne({
                provider: profile.provider,
                id: profile.id
            },

            function(err, item) {
                if (item) {
                    item.briscoId = item._id;
                    next(item);
                }
                else {
                    // First create a brand new user:                    
                    collection.insert(profile, {
                        safe: true
                    }, function(err, result) {
                        if (err) throw err;
                        else {
                            profile.briscoId = result[0]._id;
                            next(profile);
                        }
                    });
                }
            });
        });
    };

    // Returns a promise
    me.getUserSummaryById = function(id) {
        return cache.get("user-" + id, function(found) {
            client.collection('users').find({
                '_id': id
            }).toArray(function(err, items) {
                if (err) throw err;
                else {
                    found(getUserSummary(items[0]));
                }
            });
        });
    };

    function getUserSummary(user) {
        return {
            displayName: user.displayName,
            email: user.emails[0]
        };
    }

    me.findById = function(id, next) {
        client.collection('users').find({
            'id': id
        }).toArray(function(err, items) {
            next(items[0]);
        });
    };


    return me;
};
