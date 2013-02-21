define(['angular', 'underscore', 'briscoHtml', 'briscoScore', 'briscoGame', 'pbnEntities'], function(angular, _, briscoHtml, briscoScore, briscoGame, pbnEntities) {
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
                return (nsScore > 0) ? nsScore : '';
            }
            else {
                return (nsScore < 0) ? nsScore * -1 : '';
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
    var s = briscoGame.Suit;
    var d = briscoGame.Direction;
    app.filter('dealFormatter', function() {
        return function(dealObj) {
            var deal = pbnEntities.parseDeal(dealObj.deal);
            var dealer = briscoHtml.getShortDealerFromBoardNumber(dealObj.boardNr);
            var vulnerability = briscoHtml.getShortVulnerabilityFromBoardNumber(dealObj.boardNr);
            var ret = '<table class="cards">';
            ret += '<tr><td></td><td>';
            ret += getHandHtml(deal.getHand(d.North));
            ret += '</td><td class="info"><div><small>Board:</small> ' + dealObj.boardNr + '</div>';
            ret += '<div><small>Dealer:</small> ' + dealer + '</div>';
            ret += '<div><small>Vuln.:</small> ' + vulnerability + '</div></td></tr>';
            ret += '<tr><td>';
            ret += getHandHtml(deal.getHand(d.West));
            ret += '</td><td><div class="center"><br/><br/><br><br/></div></td><td>';
            ret += getHandHtml(deal.getHand(d.East));
            ret += '</td></tr><tr><td></td><td>';
            ret += getHandHtml(deal.getHand(d.South));
            ret += '</td><td></td></tr></table>';

            return ret;
        };
    });

    function getHandHtml(hand) {
        var ret = getSuitDiv(hand.getCardsWithinSuit(s.Spades), 'spades');
        ret += getSuitDiv(hand.getCardsWithinSuit(s.Hearts), 'hearts');
        ret += getSuitDiv(hand.getCardsWithinSuit(s.Diamonds), 'diamonds');
        ret += getSuitDiv(hand.getCardsWithinSuit(s.Clubs), 'clubs');
        return ret;
    }

    function getSuitDiv(cards, cssClass) {
        var ret = '<div class="holding"><i class="' + cssClass + '"></i>';
        if (cards && cards.length > 0) {
            ret += _.reduce(cards, function(memo, card) {
                return memo + ' ' + briscoHtml.getStringFromDenomination(card.Denomination);
            }, '');
        }
        else {
            ret += ' ';
        }
        ret += '</div>';
        return ret;
    }

    return app;
});
