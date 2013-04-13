var ObjectID = require('mongodb').ObjectID;
var tracking = require('./tracking');
var _ = require("underscore");
var Q = require("q");

exports.init = function(mongoClient, dbUser) {

    var me = {};

    me.create = function(user, name, club, next) {
        var tournament = tracking.trackObject(user, {});
        tournament.name = name;
        tournament.club = club || user.personalClub;
        tournament.pairs = [];
        mongoClient.collection('tournaments').insert(
        tournament, {
            safe: true
        },

        function(err, result) {
            next(result[0]._id);
        });
    };

    me.upload = function(user, club, tournament, next) {
        var t = tracking.trackObject(user, tournament);
        t.club = club || 0;

        mongoClient.collection('tournaments').insert(t, {
            safe: true
        }, function(err, result) {
            next(result[0]._id);
        });
    };

    me.findAll = function(user, club, next) {
        club = club || 0;
        var criteria = {
            club: club
        };
        // If club == 0 only list tournaments by "me"
        if (club === 0) criteria.createdBy = user._id;

        mongoClient.collection('tournaments').find(criteria).toArray(function(err, items) {
            // Loop over tournaments and populate createdByDetails:
            var promises = [];
            _.each(items, function(item) {
                var getUserPromise = dbUser.getUserSummaryById(item.createdBy);
                promises.push(getUserPromise);
                Q.when(getUserPromise).then(function(user) {
                    item.createdByDetails = user;
                });
            });
            Q.allResolved(promises).then(function() {
                next(items);
            });
        });
    };

    me.findById = function(id, club, next) {
        mongoClient.collection('tournaments').find({
            '_id': ObjectID(id),
            'club': club
        }).toArray(function(err, items) {
            next(items[0]);
        });
    };


    return me;
};
