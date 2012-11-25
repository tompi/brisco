exports.init = function(app, config) {
    
    var me = {};

    var redis = require('redis'), 
        client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST); 
        
    client.auth(config.REDIS_PASSWORD);
    
    me.createTournament = function(next) {
        client.incr("tournament", function(err, id) {
            next(id);
        });
    };
    
    me.findOrCreateUser = function(profile, next) {
        client.get(profile.provider + "-" + profile.id, function(err, userId) {
            if (!userId) {
                client.incr("user", function(err, id) {
                    profile.briscoId = id;
                    client.set("user-" + id, JSON.stringify(profile));
                    client.set(profile.provider + "-" + profile.id, id);
                    console.log("created new user in db");
                    next(profile);
                });
            } else {
                client.get("user-" + userId, function(err, user) {
                    console.log("read user from db");
                    next(JSON.parse(user));
                });                
            }
        });
    };
    
    return me;
};
