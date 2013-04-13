var briscoGameRef = 'briscoGame';
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
    briscoGameRef = './briscoGame';
}

define([briscoGameRef], function(briscoGame) {
    var briscoHtml = {};
    var d = briscoGame.Direction;
    var den = briscoGame.Denomination;
    var s = briscoGame.Suit;
    var v = briscoGame.Vulnerability;
    
    briscoHtml.getStringFromSuit = function(suit) {
        switch (suit) {
        case s.Spades:
            return '&spades;';
        case s.Hearts:
            return '<span class="red">&hearts;</span>';
        case s.Diamonds:
            return '<span class="red">&diams;</span>';
        case s.Clubs:
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
        case d.North:
            return 'North';
        case d.South:
            return 'South';
        case d.West:
            return 'West';
        case d.East:
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
        case d.North:
            return 'N';
        case d.South:
            return 'S';
        case d.West:
            return 'W';
        case d.East:
            return 'E';
        default:
            return 'Unknown';
        }
    };
    briscoHtml.getShortDealerFromBoardNumber = function(boardNumber) {
        var dealer = briscoGame.Board.getDealer(boardNumber);
        return briscoHtml.getShortStringFromDirection(dealer);
    };
    briscoHtml.getShortVulnerabilityFromBoardNumber = function(boardNumber) {
        var vulnerability = briscoGame.Board.getVulnerability(boardNumber);
        if (!vulnerability) {
            return '';
        }
        switch (vulnerability) {
        case v.NorthSouth:
            return 'NS';
        case v.EastWest:
            return 'EW';
        case v.Both:
            return 'All';
        case v.None:
            return 'None';
        default:
            return 'Unknown';
        }
    };
    briscoHtml.getStringFromDenomination = function(denomination) {
        if (!denomination) {
            return '';
        }
        switch (denomination) {
        case den.Two:
            return '2';
        case den.Three:
            return '3';
        case den.Four:
            return '4';
        case den.Five:
            return '5';
        case den.Six:
            return '6';
        case den.Seven:
            return '7';
        case den.Eight:
            return '8';
        case den.Nine:
            return '9';
        // TODO: Localization
        case den.Ten:
            return 'T';
        case den.Jack:
            return 'J';
        case den.Queen:
            return 'Q';
        case den.King:
            return 'K';
        case den.Ace:
            return 'A';
        default:
            return '?';
        }
    };

    return briscoHtml;
});