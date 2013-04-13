if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore'], function(_) {
    var briscoGame = {};

    briscoGame.Board = {
        getVulnerability: function(boardNumber) {
            var vulnMod = boardNumber % 16;
            switch (vulnMod) {
            case 1:
            case 8:
            case 11:
            case 14:
                return briscoGame.Vulnerability.None;
            case 4:
            case 7:
            case 10:
            case 13:
                return briscoGame.Vulnerability.Both;
            case 3:
            case 6:
            case 9:
            case 0:
                return briscoGame.Vulnerability.EastWest;
            default:
                return briscoGame.Vulnerability.NorthSouth;
            }
        },

        getDealer: function(boardNumber) {
            var dealerMod = boardNumber % 4;
            switch (dealerMod) {
            case 1:
                return briscoGame.Direction.North;
            case 2:
                return briscoGame.Direction.East;
            case 3:
                return briscoGame.Direction.South;
            default:
                return briscoGame.Direction.West;
            }
        }
    };

    briscoGame.Direction = {
        North: 1,
        South: 2,
        East: 3,
        West: 4        
    };
    briscoGame.isNorthSouth = function(direction) {
        return direction === briscoGame.Direction.North || direction === briscoGame.Direction.South;
    };

    briscoGame.Vulnerability = {
        None: 1,
        Both: 2,
        NorthSouth: 3,
        EastWest: 4,
        isVulnerable: function(vulnerability, direction) {
            if (vulnerability === this.None) return false;
            if (vulnerability === this.Both) return true;
            if (vulnerability === this.NorthSouth) return briscoGame.isNorthSouth(direction);
            return !briscoGame.isNorthSouth(direction);
        }
    };

    briscoGame.Suit = {
        Clubs: 1,
        Diamonds: 2,
        Hearts: 3,
        Spades: 4,
        Notrump: 5,

        isMajor: function(suit) {
            return (suit === this.Spades || suit === this.Hearts);
        },

        isMinor: function(suit) {
            return (suit === this.Clubs || suit === this.Diamonds);
        },

        getPointsPerTrick: function(suit) {
            return this.isMinor(suit) ? 20 : 30;
        },

        getExtraPointsForFirstTrick: function(suit) {
            return suit === this.Notrump ? 10 : 0;
        }
    };

    briscoGame.Denomination = {
        Ace: 14,
        King: 13,
        Queen: 12,
        Jack: 11,
        Ten: 10,
        Nine: 9,
        Eight: 8,
        Seven: 7,
        Six: 6,
        Five: 5,
        Four: 4,
        Three: 3,
        Two: 2,
        Small: -1,
        Unknown: -2
    };

    briscoGame.Card = {
        equals: function(a, b) {
            if (a && b && a.Suit === b.Suit && a.Denomination === b.Denomination) return true;
            return false;
        }
    };

    briscoGame.Bid = {
        pass: false,
        level: -1,
        suit: null,
        double: false,
        reDouble: false,
        explanation: null,
        conventional: false,
        bidQuality: null,
        yourTurn: false
    };

    briscoGame.Auction = {
        bids: [],
        explanations: [],
        dealer: null
    };

    briscoGame.Hand = {
        isComplete: function(hand) {
            if (hand.Cards && hand.Cards.length === 13) return true;
            return false;
        },
        contains: function(hand, card) {
            if (!hand.Cards) {
                return false;
            }
            return _.any(hand.Cards, function(myCard) {
                return briscoGame.Card.equals(card,myCard);
            });
        },

        getCardsWithinSuit: function(hand, suit) {
            return _.filter(hand.Cards, function(card) {
                return card.Suit === suit;
            });
        },
        removeSuit: function(hand, suit) {
            hand.Cards = _.filter(hand.Cards, function(card) {
                return !!card && card.Suit !== suit;
            });
        }
    };

    briscoGame.Deal = {
        contains: function(deal, card) {
            if (briscoGame.Hand.contains(deal[briscoGame.Direction.West],card)) return true;
            if (briscoGame.Hand.contains(deal[briscoGame.Direction.North],card)) return true;
            if (briscoGame.Hand.contains(deal[briscoGame.Direction.East],card)) return true;
            if (briscoGame.Hand.contains(deal[briscoGame.Direction.South],card)) return true;
            return false;
        }
    };

    briscoGame.BidQuality = {
        VeryGood: 1,
        Good: 2,
        Poor: 3,
        VeryPoor: 4,
        Speculative: 5,
        Questionable: 6
    };

    briscoGame.getHandMissing = function(hand1, hand2, hand3) {
        if (!hand1 || !hand2 || !hand3) {
            return null;
        }
        if (!briscoGame.Hand.isComplete(hand1) || !briscoGame.Hand.isComplete(hand2) || !briscoGame.Hand.isComplete(hand3)) {
            return null;
        }
        var missingHand = {Cards: []};
        for (var s in briscoGame.Suit) {
            var suit = briscoGame.Suit[s];
            for (var d in briscoGame.Denomination) {
                var denomination = briscoGame.Denomination[d];
                if (denomination !== briscoGame.Denomination.Small && d !== briscoGame.Denomination.Unknown) {
                    var c = { Suit: suit, Denomination: denomination};
                    if (!briscoGame.Hand.contains(hand1,c) && !briscoGame.Hand.contains(hand2,c) && !briscoGame.Hand.contains(hand3,c)) {
                        missingHand.Add(c);
                    }
                }
            }
        }
        return missingHand;
    };

    briscoGame.Contract = {
        Level: 0,
        Suit: null,
        Doubled: false,
        ReDoubled: false,
        Declarer: null,
        Tricks: 0,
        Lead: null
    };

    briscoGame.getOverTricks = function(contract) {
        return contract.Tricks - (contract.Level + 6);
    };

    briscoGame.getContractMade = function(contract) {
        return briscoGame.getOverTricks(contract) >= 0;
    };

    briscoGame.isSmallSlam = function(contract) {
        return contract.Level === 6;
    };

    briscoGame.isGrandSlam = function(contract) {
        return contract.Level === 7;
    };
    // Current version.
    briscoGame.VERSION = '0.3';
    
    return briscoGame;
});
