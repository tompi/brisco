define(['app', 'underscore'], function(app, _) {
    app.factory('tournamentResource', function($http, $routeParams, $q) {
        var me = {};
        var t;
        var promise = $http.get('/api/testTournament?id=' + $routeParams.id);
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
