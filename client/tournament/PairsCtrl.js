define(['angular', 'underscore', 'app'], function(angular, _, app) {
    app.controller('PairsCtrl', 
   ['$scope', 'tournamentResource', function PairsCtrl ($scope, tournamentResource) { 
        tournamentResource.getTournament(function(t) {
            $scope.pairs = t.pairs;
        });
        $scope.addPair = function() {
            $scope.pairNo = $scope.getNextPairNo();
            $scope.shouldBeOpen = true;
        };
        $scope.editPair = function(pairNo) {
            var pairToEdit = $scope.findPair(pairNo);
            if (pairToEdit) {
                $scope.pairNo = pairToEdit.no;
                $scope.nameNE = pairToEdit.ne;
                $scope.nameSW = pairToEdit.sw;
            }
            $scope.shouldBeOpen = true;
        };
        $scope.close = function() {
            $scope.pairNo = '';
            $scope.nameNE = '';
            $scope.nameSW = '';
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
            if (!$scope.pairNo || !$scope.nameNE || !$scope.nameSW) {
                $scope.invalidPair = true;
                $scope.invalidPairMessage = 'You need to fill out all 3 fields...';
                return;
            } 
            var pairToSave = $scope.findPair($scope.pairNo);
            if (pairToSave) {
                pairToSave.no = $scope.pairNo;
                pairToSave.ne = $scope.nameNE;
                pairToSave.sw = $scope.nameSW;
            }
            else {
                $scope.pairs.push({
                    no: $scope.pairNo,
                    ne: $scope.nameNE,
                    sw: $scope.nameSW
                });
            }
            $scope.close();
        };

        $scope.removePair = function(index) {
            $scope.pairs.splice(index, 1);
        };
    }]);
});