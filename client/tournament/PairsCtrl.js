define(['angular', 'underscore', 'app'], function(angular, _, app) {
    app.controller('PairsCtrl', 
   ['$scope', 'tournamentResource', function PairsCtrl ($scope, tournamentResource) { 
        tournamentResource.getTournament(function(t) {
            $scope.pairs = t.pairs;
        });
        $scope.addPair = function() {
            $scope.editingPair = { 
                no: $scope.getNextPairNo(),
                ne: {}, sw: {}
            };
            $scope.shouldBeOpen = true;
        };
        $scope.editPair = function(pairNo) {
            $scope.editingPair = angular.copy($scope.findPair(pairNo));
            $scope.shouldBeOpen = true;
        };
        $scope.close = function() {
            $scope.shouldBeOpen = false;
        };
        $scope.findPair = function(pairNo) {
            return _.find($scope.pairs, function(p) {
                return p.no == pairNo;
            });
        };
        $scope.getNextPairNo = function() {
            var i = 1;
            while ($scope.findPair(i)) {
                i++;
            }
            return i;
        };
        $scope.savePair = function() {
            if (!$scope.editingPair.no || !$scope.editingPair.ne.name || !$scope.editingPair.sw.name) {
                $scope.invalidPair = true;
                $scope.invalidPairMessage = 'You need to fill out at least pairnumber and names...';
                return;
            } 
            var pairToSave = $scope.findPair($scope.editingPair.no);
            if (pairToSave) {
                pairToSave.no = $scope.editingPair.no;
                pairToSave.ne = $scope.editingPair.ne;
                pairToSave.sw = $scope.editingPair.sw;
            }
            else {
                $scope.pairs.push($scope.editingPair);
            }
            $scope.close();
        };

        $scope.removePair = function(index) {
            $scope.pairs.splice(index, 1);
        };
    }]);
});