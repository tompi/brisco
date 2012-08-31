var _ = require("underscore");
(function() {
    var brisco = {};
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = brisco;
        }
        exports.brisco = brisco;
    }
    else {
        root['brisco'] = brisco;
    }

    brisco.Board = {
        getVulnerability: function(boardNumber) {
            var vulnMod = boardNumber % 16;
            switch (vulnMod) {
            case 1:
            case 8:
            case 11:
            case 14:
                return brisco.Vulnerability.None;
            case 4:
            case 7:
            case 10:
            case 13:
                return brisco.Vulnerability.Both;
            case 3:
            case 6:
            case 9:
            case 0:
                return brisco.Vulnerability.EastWest;
            default:
                return brisco.Vulnerability.NorthSouth;
            }
        },

        getDealer: function(boardNumber) {
            var dealerMod = boardNumber % 4;
            switch (dealerMod) {
            case 1:
                return brisco.Direction.North;
            case 2:
                return brisco.Direction.East;
            case 3:
                return brisco.Direction.South;
            default:
                return brisco.Direction.West;
            }
        }
    };

    brisco.Direction = {
        North: 1,
        South: 2,
        East: 3,
        West: 4
    };
    brisco.isNorthSouth = function(direction) {
        return direction === brisco.Direction.North || direction === brisco.Direction.South;
    };

    brisco.Vulnerability = {
        None: 1,
        Both: 2,
        NorthSouth: 3,
        EastWest: 4,
        isVulnerable: function(vulnerability, direction) {
            if (vulnerability === this.None) return false;
            if (vulnerability === this.Both) return true;
            if (vulnerability === this.NorthSouth) return brisco.isNorthSouth(direction);
            return !brisco.isNorthSouth(direction);
        }
    };

    brisco.Suit = {
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

        pointsPerTrick: function(suit) {
            return this.isMinor(suit) ? 20 : 30;
        },

        extraPointsForFirstTrick: function(suit) {
            return suit === this.Notrump ? 10 : 0;
        }
    };

    brisco.Denomination = {
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

    brisco.Card = {
        Denomination: null,
        Suit: null,
        equals: function(other) {
            if (other && other.Suit === this.Suit && other.Denomination === this.Denomination) return true;
            return false;
        }
    };

    brisco.Bid = {
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

    brisco.Auction = {
        bids: [],
        explanations: [],
        dealer: null
    };

    brisco.Hand = {
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
            return _.find(this.Cards, function(card) {
                return card.Suit === suit;
            });
        },
        addCards: function(cards) {
            this.Cards = this.Cards.concat(cards);
        },

        removeSuit: function(suit) {
            var newCards = [];
            for (var i = 0; i < this.Cards.length; i++) {
                if (this.Cards[i] !== null && this.Cards[i].Suit !== suit) {
                    newCards.push(this.Cards[i]);
                }
            }
            this.Cards = newCards;
        }
    };

    brisco.Deal = {
        West: null,
        North: null,
        East: null,
        South: null,

        getHand: function(direction) {
            switch (direction) {
            case brisco.Direction.West:
                return this.West;
            case brisco.Direction.North:
                return this.North;
            case brisco.Direction.East:
                return this.East;
            case brisco.Direction.South:
                return this.South;
            default:
                return null;
            }
        },
        setHand: function(direction, hand) {
            switch (direction) {
            case brisco.Direction.West:
                this.West = hand;
                break;
            case brisco.Direction.North:
                this.North = hand;
                break;
            case brisco.Direction.East:
                this.East = hand;
                break;
            case brisco.Direction.South:
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

    brisco.BidQuality = {
        VeryGood: 1,
        Good: 2,
        Poor: 3,
        VeryPoor: 4,
        Speculative: 5,
        Questionable: 6
    };

    brisco.getHandMissing = function(hand1, hand2, hand3) {
        if (hand1 === null || hand2 === null || hand3 === null) {
            return null;
        }
        if (!hand1.isComplete() || !hand2.isComplete() || !hand3.isComplete()) {
            return null;
        }
        var missingHand = Object.create(brisco.Hand);
        for (var s in brisco.Suit) {
            var suit = brisco.Suit[s];
            for (var d in brisco.Denomination) {
                var denomination = brisco.Denomination[d];
                if (denomination !== brisco.Denomination.Small && d !== brisco.Denomination.Unknown) {

                    var c = Object.create(brisco.Card);
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

    brisco.Contract = {
        Level: 0,
        Suit: null,
        Doubled: false,
        ReDoubled: false,
        Player: null,
        Tricks: 0,
        Lead: null
    };

    brisco.getOverTricks = function(contract) {
        return contract.Tricks - (contract.Level + 6);
    };

    brisco.getContractMade = function(contract) {
        return brisco.getOverTricks(contract) >= 0;
    };

    brisco.isSmallSlam = function(contract) {
        return contract.Level === 6;
    };

    brisco.isGrandSlam = function(contract) {
        return contract.Level === 7;
    };
    // Current version.
    brisco.VERSION = '0.0.2';
}).call(this);
