if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./briscoGame'], function(briscoGame) {
    var briscoHtml = {};

    briscoHtml.getStringFromSuit = function(suit) {
        switch (suit) {
        case briscoGame.Suit.Spades:
            return '&spades;';
        case briscoGame.Suit.Hearts:
            return '<span class="red">&hearts;</span>';
        case briscoGame.Suit.Diamonds:
            return '<span class="red">&diams;</span>';
        case briscoGame.Suit.Clubs:
            return '&clubs;';
        default:
            return 'NT';
        }
    };

    briscoHtml.getStringFromContract = function(contract) {
        if (!contract) {
            return '';
        }
        if (contract.Level === 0 || !contract.Suit) {
            return 'Pass';
        }
        var ret = contract.Level;
        ret += briscoHtml.getStringFromSuit(contract.Suit);
        if (contract.ReDoubled) {
            ret += 'XX';
        }
        else if (contract.Doubled) {
            ret += 'X';
        }
        return ret;
    };

    briscoHtml.getTricksStringFromContract = function(contract) {
        var diff = contract.Tricks - (contract.Level + 6);
        if (diff === 0) {
            return '=';
        }
        else if (diff > 0) {
            return '+' + diff;
        }
        else {
            return diff;
        }
    };

    briscoHtml.getStringFromDirection = function(direction) {
        if (!direction) {
            return '';
        }
        switch (direction) {
        case briscoGame.Direction.North:
            return 'North';
        case briscoGame.Direction.South:
            return 'South';
        case briscoGame.Direction.West:
            return 'West';
        case briscoGame.Direction.East:
            return 'East';
        default:
            return 'Unknown';
        }
    };

    briscoHtml.getShortStringFromDirection = function(direction) {
        if (!direction) {
            return '';
        }
        switch (direction) {
        case briscoGame.Direction.North:
            return 'N';
        case briscoGame.Direction.South:
            return 'S';
        case briscoGame.Direction.West:
            return 'W';
        case briscoGame.Direction.East:
            return 'E';
        default:
            return 'Unknown';
        }
    };
    return briscoHtml;
});