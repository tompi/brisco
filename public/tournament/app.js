define(['angular', 'briscoHtml', 'briscoScore'], function(angular, briscoHtml, briscoScore) {
    var app = angular.module('psa', ['ngResource']);

    app.filter('contractFormatter', function() {
        return function(contract) {
            return briscoHtml.getStringFromContract(contract);
        };
    });
    app.filter('directionFormatter', function() {
        return function(direction) {
            return briscoHtml.getStringFromDirection(direction);
        };
    });
    app.filter('scoreFormatter', function() {
        return function(contract, boardNumber, forNorthSouth) {
            var nsScore = briscoScore.getNorthSouthPointsWithBoardNo(contract, boardNumber);
            if (!nsScore) return '';
            if (forNorthSouth) {
                return (nsScore>0) ? nsScore : '';
            } else {
                return (nsScore<0) ? nsScore * -1: '';
            }
        };
    });
    app.filter('boardInfoFormatter', function() {
        return function(boardNumber) {
            var dealer = briscoHtml.getShortDealerFromBoardNumber(boardNumber);
            var vulnerability = briscoHtml.getShortVulnerabilityFromBoardNumber(boardNumber);
            return "Dealer: " + dealer + ", Vulnerable: " + vulnerability;
        };
    });
    return app;
});
