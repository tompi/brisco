define(['angular', 'underscore', 'app'], function(angular, _, app) {
    app.controller('BoardsCtrl', 
   ['$scope', 'tournamentResource', function BoardsCtrl ($scope, tournamentResource) { 
    tournamentResource.getTournament(function(t) {
        $scope.boards = t.boards;
        $scope.activeBoard = $scope.boards[0];
        setNextBoardNumber();
    });

    $scope.setActiveBoard = function(board) {
        $scope.activeBoard = board;
    };  
    $scope.showAddBoardModal = function() { $scope.addBoardModalShown = true; };
    $scope.hideAddBoardModal = function() { $scope.addBoardModalShown = false; };

    $scope.addBoard = function() {
        $scope.boards.push({no: $scope.newBoardNo, results:[]});
        setNextBoardNumber();
        $scope.hideAddBoardModal();
    };
    
    function setNextBoardNumber() {
      if (!$scope.boards) return 1;
      $scope.newBoardNo = _.chain($scope.boards).pluck('no').max().value() + 1;
    }
    setNextBoardNumber();
 }]);
});