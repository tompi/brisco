exports.init = function(app, config) {

    var me = {};

    var redis = require('redis'),
        redisclient = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
    var mongo = require('mongodb'),
        MongoServer = mongo.Server,
        MongoDb = mongo.Db;

    var mongoServer = new MongoServer(config.MONGO_HOST, config.MONGO_PORT, {
        auto_reconnect: true
    });
    var mongoDb = new MongoDb(config.MONGO_DB, mongoServer);

    function openMongoConnection(next) {
        mongoDb.open(function(err, client) {
            client.authenticate(config.MONGO_USER, config.MONGO_PASSWD, function(err, success) {
                if (!err) next(client);
            });
        });
    }

    redisclient.auth(config.REDIS_PASSWORD);

    me.createTournament = function(next) {
        redisclient.incr("tournament", function(err, id) {
            next(id);
        });
    };

    me.findOrCreateUser = function(profile, next) {
        openMongoConnection(function(db) {
           db.collection('users', function(err, collection) {
               collection.findOne({provider: profile.provider, id: profile.id}, function(err, item) {
                   if (item) {
                       item.briscoId = item._id;
                       next(item);
                   } else {
                        collection.insert(profile, {safe: true}, function(err,result) {
                            profile.briscoId = result[0]._id;
                            next(profile);
                        }); 
                   }
               });
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
