var briscoGameRef = 'briscoGame';
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
    briscoGameRef = '../briscoGame';
}

define([briscoGameRef, 'underscore'], function(briscoGame, _) {
    var me = {};

    me.getContractFromString = function(s) {
        if (!s) return null;

        var ret = {};
        if (s[0] === 'P') {
            ret.Level = 0;
            return ret;
        }
        ret.Level = parseInt(s[0], 10);
        ret.Suit = getSuitFromString(s[1]);
        if (s.indexOf('XX') > 0 || s.indexOf('R') > 0) ret.ReDoubled = true;
        if (ret.ReDoubled) {
            ret.Doubled = true;
        }
        else {
            if (s.indexOf('X') > 0) ret.Doubled = true;
        }
        return ret;
    };

    function getSuitFromString(suit) {
        if (suit === 'N') {
            return briscoGame.Suit.Notrump;
        }
        else if (suit === 'S') {
            return briscoGame.Suit.Spades;
        }
        else if (suit === 'H') {
            return briscoGame.Suit.Hearts;
        }
        else if (suit === 'D') {
            return briscoGame.Suit.Diamonds;
        }
        else {
            return briscoGame.Suit.Clubs;
        }
    }
    me.getDeclarerFromString = function(direction) {
        if (direction === 'N') {
            return briscoGame.Direction.North;
        }
        else if (direction === 'S') {
            return briscoGame.Direction.South;
        }
        else if (direction === 'E') {
            return briscoGame.Direction.East;
        } else {
            return briscoGame.Direction.West;
        }
    };
    var d = briscoGame.Direction;
    var directions = [d.North, d.East, d.South, d.West];
    me.parseDeal = function(dealString) {
        var hands = dealString.split(':')[1].split(' ');
        var ret = {};
        for (var i=0; i<4; i++) ret[directions[i]] = getHand(hands[i]);
        return ret;
    };
    var s = briscoGame.Suit;
    var suits = [s.Spades, s.Hearts, s.Diamonds, s.Clubs];
    function getHand(hand) {
        var ret = {Cards: []};
        var suitsString = hand.split('.');
        for (var i=0; i<4; i++) ret.Cards = ret.Cards.concat(getSuit(suitsString[i], suits[i]));        
        return ret;
    }    
    function getSuit(suitString, suit) {
        if (!suitString) return [];
        var ret = _.map(suitString.split(''), function(denominationString) {
            return { Denomination: getDenomination(denominationString), Suit: suit};
        });
        return ret;
    }
    function getDenomination(denominationString) {
        var d = briscoGame.Denomination;
        switch (denominationString) {
            case '2': return d.Two;
            case '3': return d.Three;
            case '4': return d.Four;
            case '5': return d.Five;
            case '6': return d.Six;
            case '7': return d.Seven;
            case '8': return d.Eight;
            case '9': return d.Nine;
            case 'T': return d.Ten;
            case 'J': return d.Jack;
            case 'Q': return d.Queen;
            case 'K': return d.King;
            case 'A': return d.Ace;
            default: return null;
        }
    }
    return me;
});
