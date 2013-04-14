define(['app', 'underscore'], function(app, _) {
    app.factory('tournamentsResource', function($http, $q) {
        var me = {};
        var promise;
        me.updateTournaments = function() {
            promise = $http.get('/api/tournaments');
            return promise;
        };
        me.updateTournaments();
        me.getTournaments = function() {
            return promise;
        };
        return me;
    });
});
