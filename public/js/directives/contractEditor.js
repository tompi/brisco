define(['angular', 'underscore', 'briscoHtml', 'briscoScore', 'briscoGame', 'pbnEntities'],
function(angular, _, briscoHtml, briscoScore, briscoGame, pbnEntities, template) {
angular.module('brisco', []).
  directive('briscoContractEditor', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: { contract: '=ngModel'},
      replace: true,
      templateUrl: '../template/contract/editor.html',
      controller: function($scope) {
          $scope.isActiveLevel = function(level) {
              return $scope.contract.Level === level;
          };
          $scope.setLevel = function(level) {
              $scope.contract.Level = level;
              if (level > 0 && !$scope.contract.Tricks) {
                  $scope.contract.Tricks = level + 6;
              }
          };
          var s = briscoGame.Suit;
          var suits = [s.Clubs, s.Diamonds, s.Hearts, s.Spades, s.Notrump];
          $scope.isActiveSuit = function(suitNr) {
              return $scope.contract.Suit === suits[suitNr];
          };
          $scope.setSuit = function(suitNr) {
              $scope.contract.Suit = suits[suitNr];
          };
          var d = briscoGame.Direction;
          var directions = [d.North, d.South, d.East, d.West];
          $scope.isActiveDeclarer = function(directionNr) {
              return $scope.contract.Declarer === directions[directionNr];
          };
          $scope.setDeclarer = function(directionNr) {
              $scope.contract.Declarer = directions[directionNr];
          };
          $scope.incTricks = function() {
              var oldTricks = $scope.contract.Tricks;
              var newTricks = 1;
              if (oldTricks) newTricks = oldTricks + 1;
              if (newTricks>13) newTricks = 13;
              $scope.contract.Tricks = newTricks;
          }
          $scope.decrTricks = function() {
              var oldTricks = $scope.contract.Tricks;
              var newTricks = 0;
              if (oldTricks) newTricks = oldTricks - 1;
              if (newTricks<0) newTricks = 0;
              $scope.contract.Tricks = newTricks;
          }
      }
    };
  });    
});
