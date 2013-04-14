
function TournamentsCtrl($scope, tournamentsResource, $q) {
    $scope.updateTournaments = function(tournaments) {
        $scope.tournaments = tournaments.data;
        $scope.tournamentsLoaded = true;        
    };
    $scope.tournamentsLoaded = false;
    $q.when(tournamentsResource.getTournaments())
      .then($scope.updateTournaments);    
    $scope.fileModalOpen = false;

    $scope.openUploadModal = function() {
        $scope.fileModalOpen = true;
    };
    $scope.close = function() {
        $scope.fileModalOpen = false;
    };
  $scope.uploadComplete = function (content, completed) {
    if (completed && content && content.length > 0) {        
        $q.when(tournamentsResource.getTournaments())
          .then($scope.updateTournaments);    
        $scope.fileModalOpen = false;
    }
  };    
}

require(["../config"], function() {
    require(["jquery", "underscore", "jquery-ui", "bootstrap", "angular", "angular-resource", "ui", "ui.bootstrap", "app", "tournamentsResource", "ngUpload"], 
    function($, _, ui, bs, angular) {
        $(function() {
            angular.bootstrap(document, ['tournaments', 'ui.bootstrap', 'ui', 'ngUpload']);
        });
    });
});
