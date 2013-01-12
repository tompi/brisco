require.config({
    baseUrl: "../js/",
    paths: {
        "bootstrap": "lib/bootstrap",
        "angular": "lib/angular.min",
        "underscore": "lib/underscore"
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

    $scope.addPair = function() {
        $scope.pairs.push({
            pairNo: $scope.pairNo,
            nameNE: $scope.nameNE,
            nameSW: $scope.nameSW
        });
        $scope.pairNo = '';
        $scope.nameNE = '';
        $scope.nameSW = '';
    };

    $scope.removePair = function(index) {
        $scope.pairs.splice(index, 1);
    };
}


require(["jquery", "bootstrap", "angular", "../prototypes/participants-app"], function($, bs, angular) {
    $(function() {
        angular.bootstrap(document, ['psa']);
    });
});
