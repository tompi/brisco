
function SetupCtrl($scope, tournamentResource) {
    tournamentResource.getTournament(function(t) {
        $scope.tournament = t;
    });
}

function CardsCtrl($scope, tournamentResource) {
    tournamentResource.getTournament(function(t) {
        $scope.deals = t.deals;
    });
}

function TournamentCtrl($scope, tournamentResource) {
    $scope.tournamentLoaded = false;
    tournamentResource.getTournament(function(t) {
        $scope.tournament = t;
        $scope.tournamentLoaded = true;
    });
}

require(["../config"], function() {
    require(["jquery", "underscore", "jquery-ui", "bootstrap", "angular", "angular-resource", "ui", "ui.bootstrap", "app", "tournamentService", "PairsCtrl", "BoardsCtrl", "ScoreCtrl", "briscoContractEditor"], 
    function($, _, ui, bs, angular) {
        $(function() {
            angular.bootstrap(document, ['psa', 'ui.bootstrap', 'ui', 'brisco']);
        });
    });
});
