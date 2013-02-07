require.config({
    baseUrl: "../js/",
    paths: {
        "bootstrap": "lib/bootstrap",
        "angular": "lib/angular/angular.min",
        "underscore": "lib/underscore",
        "ui": "lib/angular/ui",
        "ui.bootstrap": "lib/angular/bootstrap"
    },
    shim: {
        underscore: { exports: '_' },
        angular: { exports: 'angular' },
        'ui.bootstrap': { deps: ['angular'] }
    }
});

var globalPairs = [{
    pairNo: 1,
    nameNE: "John Forrester",
    nameSW: "Aylene Joleen"
}, {
    pairNo: 2,
    nameNE: "Wayne Schmayne",
    nameSW: "Wolum Holum"
}];

function PairsCtrl($scope) {
    $scope.pairs = globalPairs;
    
    $scope.addPair = function() {
        $scope.pairNo= $scope.getNextPairNo();
        $scope.shouldBeOpen = true;
    };
    $scope.editPair = function(pairNo) {
      var pairToEdit = $scope.findPair(pairNo);
        if (pairToEdit) {
            $scope.pairNo= pairToEdit.pairNo;
            $scope.nameNE= pairToEdit.nameNE;
            $scope.nameSW= pairToEdit.nameSW;
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
          return p.pairNo == pairNo;
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
        var pairToSave = $scope.findPair($scope.pairNo);
        if (pairToSave) {
            pairToSave.pairNo = $scope.pairNo;
            pairToSave.nameNE = $scope.nameNE;
            pairToSave.nameSW = $scope.nameSW; 
        } else {
          $scope.pairs.push({
            pairNo: $scope.pairNo,
            nameNE: $scope.nameNE,
            nameSW: $scope.nameSW
          });
        }
        $scope.close();
    };

    $scope.removePair = function(index) {
        $scope.pairs.splice(index, 1);
    };
}


require(["jquery", "underscore", "bootstrap", "angular", "ui.bootstrap", "../prototypes/participants-app"], function($, _) {
    $(function() {
        angular.bootstrap(document, ['ui.bootstrap']);
    });
});
