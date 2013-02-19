if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../briscoGame'], function(briscoGame) {
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
        ret.ReDoubled = s.indexOf('XX') > 0 || s.indexOf('R') > 0;
        if (ret.ReDoubled) {
            ret.Doubled = true;
        }
        else {
            ret.Doubled = s.indexOf('X') > 0;
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

    return me;
});
