define(['app'], function(app) {
    app.factory('tournamentResource', function($http, $routeParams, $q) {
        var me = {};
        var promise = $http.get('/api/testTournament?id=' + $routeParams.id);
        me.getTournament = function(callback) {
            if (callback) $q.when(promise).then(function(result) {callback(result.data);});
            return promise;
        };
        return me;
    });
});
