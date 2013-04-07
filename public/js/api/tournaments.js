define(['app', 'underscore'], function(app, _) {
    app.factory('tournamentsResource', function($http, $q) {
        var me = {};
        var promise = $http.get('/api/tournaments');
        me.getTournaments = function(callback) {
            if (callback) $q.when(promise).then(function(result) {callback(result.data);});            
            return promise;
        };
        return me;
    });
});
