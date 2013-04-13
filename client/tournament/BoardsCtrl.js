define(['angular', 'underscore', 'app'], function(angular, _, app) {
    app.controller('BoardsCtrl', 
   ['$scope', 'tournamentResource', function BoardsCtrl ($scope, tournamentResource) {            
    $scope.resultBeingEdited = {contract: {}};
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
    $scope.showAddResultModal = function() { $scope.addResultModalShown = true; };
    $scope.hideAddResultModal = function() { $scope.addResultModalShown = false; };
    $scope.addResult = function() {
        $scope.editResultIx = -1;
        $scope.resultBeingEdited = {contract: {}};
        $scope.showAddResultModal();
    };
    $scope.editResult = function(ix) { 
        var result = $scope.activeBoard.results[ix];
        $scope.editResultIx = ix;
        $scope.resultBeingEdited = angular.extend({}, result);
        $scope.resultBeingEdited.contract = angular.extend({}, result.contract);
        $scope.showAddResultModal();
    };
    $scope.saveResult = function() {
        // TODO validation
        if ($scope.editResultIx < 0) $scope.activeBoard.results.push($scope.resultBeingEdited);
        else $scope.activeBoard.results[$scope.editResultIx] = $scope.resultBeingEdited;
        $scope.hideAddResultModal();
    };
    
    function setNextBoardNumber() {
      if (!$scope.boards) return 1;
      $scope.newBoardNo = _.chain($scope.boards).pluck('no').max().value() + 1;
    }
            
    setNextBoardNumber();
 }]);
});