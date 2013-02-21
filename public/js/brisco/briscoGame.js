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
        Denomination: null,
        Suit: null,
        equals: function(other) {
            if (other && other.Suit === this.Suit && other.Denomination === this.Denomination) return true;
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
        Cards: [],

        isComplete: function() {
            if (this.Cards && this.Cards.length === 13) return true;
            return false;
        },

        contains: function(card) {
            if (card === null) {
                return false;
            }
            return _.any(this.Cards, function(myCard) {
                return card.equals(myCard);
            });
        },

        add: function(card) {
            this.Cards.push(card);
        },

        getCardsWithinSuit: function(suit) {
            return _.filter(this.Cards, function(card) {
                return card.Suit === suit;
            });
        },
        addCards: function(cards) {
            this.Cards = this.Cards.concat(cards);
        },

        removeSuit: function(suit) {
            this.Cards = _.filter(this.Cards, function(card) {
                return !!card && card.Suit !== suit;
            });
        }
    };

    briscoGame.Deal = {
        West: null,
        North: null,
        East: null,
        South: null,

        getHand: function(direction) {
            switch (direction) {
            case briscoGame.Direction.West:
                return this.West;
            case briscoGame.Direction.North:
                return this.North;
            case briscoGame.Direction.East:
                return this.East;
            case briscoGame.Direction.South:
                return this.South;
            default:
                return null;
            }
        },
        setHand: function(direction, hand) {
            switch (direction) {
            case briscoGame.Direction.West:
                this.West = hand;
                break;
            case briscoGame.Direction.North:
                this.North = hand;
                break;
            case briscoGame.Direction.East:
                this.East = hand;
                break;
            case briscoGame.Direction.South:
                this.South = hand;
                break;
            default:
                return;
            }
        },

        contains: function(card) {
            if (this.West !== null && this.West.contains(card)) return true;
            if (this.North !== null && this.North.contains(card)) return true;
            if (this.East !== null && this.East.contains(card)) return true;
            if (this.South !== null && this.South.contains(card)) return true;
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
        if (hand1 === null || hand2 === null || hand3 === null) {
            return null;
        }
        if (!hand1.isComplete() || !hand2.isComplete() || !hand3.isComplete()) {
            return null;
        }
        var missingHand = Object.create(briscoGame.Hand);
        for (var s in briscoGame.Suit) {
            var suit = briscoGame.Suit[s];
            for (var d in briscoGame.Denomination) {
                var denomination = briscoGame.Denomination[d];
                if (denomination !== briscoGame.Denomination.Small && d !== briscoGame.Denomination.Unknown) {

                    var c = Object.create(briscoGame.Card);
                    c.Suit = suit;
                    c.Denomination = denomination;
                    if (!hand1.contains(c) && !hand2.contains(c) && !hand3.contains(c)) {
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
        Player: null,
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
