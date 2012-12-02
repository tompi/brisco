exports.init = function(client) {

    var me = {};

    me.findOrCreate = function(profile, next) {
        client.collection('users', function(err, collection) {
            collection.findOne({
                provider: profile.provider,
                id: profile.id
            }, function(err, item) {
                if (item) {
                    item.briscoId = item._id;
                    next(item);
                }
                else {
                    collection.insert(profile, {
                        safe: true
                    }, function(err, result) {
                        profile.briscoId = result[0]._id;
                        next(profile);
                    });
                }
            });
        });
        /*
        redisclient.get(profile.provider + "-" + profile.id, function(err, userId) {
            if (!userId) {
                redisclient.incr("user", function(err, id) {
                    profile.briscoId = id;
                    redisclient.set("user-" + id, JSON.stringify(profile));
                    redisclient.set(profile.provider + "-" + profile.id, id);
                    console.log("created new user in db");
                    next(profile);
                });
            }
            else {
                redisclient.get("user-" + userId, function(err, user) {
                    console.log("read user from db");
                    next(JSON.parse(user));
                });
            }
        });
        */
    };


    return me;
};
