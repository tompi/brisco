require.config({
    baseUrl: "../js/",
    paths: {
        "bootstrap": "lib/bootstrap",
        "angular": "lib/angular/angular.min",
        "underscore": "lib/underscore",
        "modal": "lib/angular/modal",
        "ui": "lib/angular/ui"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        angular: {
            exports: 'angular'
        }
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
    
    $scope.open = function() {
        $scope.shouldBeOpen = true;
    };
    $scope.close = function() {
        $scope.shouldBeOpen = false;
    };

    $scope.addPair = function() {
        $scope.pairs.push({
            pairNo: $scope.pairNo,
            nameNE: $scope.nameNE,
            nameSW: $scope.nameSW
        });
        $scope.pairNo = '';
        $scope.nameNE = '';
        $scope.nameSW = '';
        $scope.close();
    };

    $scope.removePair = function(index) {
        $scope.pairs.splice(index, 1);
    };
}


require(["jquery", "bootstrap", "angular", "modal", "../prototypes/participants-app"], function($, bs, angular) {
    $(function() {
        angular.bootstrap(document, ['ui']);
    });
});
