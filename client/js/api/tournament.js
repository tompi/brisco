define(['app', 'underscore'], function(app, _) {
    app.factory('tournamentResource', function($http, $location, $q) {
        var me = {};
        var t;
        var promise = $http.get('/api/tournament/' + $location.$$path.substr(1));
        me.getTournament = function(callback) {
            if (callback) $q.when(promise).then(function(result) {t = result.data; callback(t);});
            return promise;
        };
        me.getPair = function(pairNo) {
            return _.find(t.pairs, function(pair) {return pair.no === pairNo;});
        };
        return me;
    });
});
