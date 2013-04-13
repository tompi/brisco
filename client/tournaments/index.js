
function TournamentsCtrl($scope, tournamentsResource) {
    $scope.tournamentsLoaded = false;
    tournamentsResource.getTournaments(function(tournaments) {
        $scope.tournaments = tournaments;
        $scope.tournamentsLoaded = true;
    });    
    $scope.fileModalOpen = false;

    $scope.openUploadModal = function() {
        $scope.fileModalOpen = true;
    };
    $scope.close = function() {
        $scope.fileModalOpen = false;
    };
  $scope.uploadComplete = function (content, completed) {
    if (completed && content && content.length > 0) {        
      $scope.response = JSON.parse(content); // Presumed content is a json string!
      $scope.response.style = {
        color: $scope.response.color,
        "font-weight": "bold"
      };
      // TODO: update tournament list
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
