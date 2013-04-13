var user = require("./user");
var tournament = require("./tournament");

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

    mongoDb.open(function(err, client) {
        client.authenticate(config.MONGO_USER, config.MONGO_PASSWD, function(err, success) {
            if (!err) {
                me.user = user.init(client);
                me.tournament = tournament.init(client, me.user);
                me.club = tournament.init(client);
            }
        });
    });    

    redisclient.auth(config.REDIS_PASSWORD);
    

    return me;
};
