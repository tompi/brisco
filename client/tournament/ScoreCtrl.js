define(['angular', 'underscore', 'app'], function(angular, _, app) {
    app.controller('ScoreCtrl', 
   ['$scope', 'tournamentResource', function ScoreCtrl ($scope, tournamentResource) { 
        tournamentResource.getTournament(function(t) {
            $scope.pairs = t.pairs;
        });
    }]);
});