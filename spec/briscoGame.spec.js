/*global describe,it,expect*/

var brisco = require('../public/js/brisco/briscoGame');

describe('brisco.Direction', function() {
    it('should say north is northsouth', function() {
        expect(brisco.isNorthSouth(brisco.Direction.North)).
        toEqual(true);
    });
    it('should say west is not northsouth', function() {
        expect(brisco.isNorthSouth(brisco.Direction.West)).
        toEqual(false);
    });
});

describe('brisco.Vulnerabillity', function() {
    it('should say north is vulnerable when both', function() {
        expect(brisco.Vulnerability.isVulnerable(brisco.Vulnerability.Both, brisco.Direction.North)).
        toEqual(true);
    });
    it('should say north is not vulnerable when eastwest', function() {
        expect(brisco.Vulnerability.isVulnerable(brisco.Vulnerability.EastWest, brisco.Direction.North)).
        toEqual(false);
    });
});

describe('brisco.Board', function() {
    it('should say None vulnerable for board 1', function() {
        expect(brisco.Board.getVulnerability(1)).
        toEqual(brisco.Vulnerability.None);
    });
    it('should say NorthSouth vulnerable for board 5', function() {
        expect(brisco.Board.getVulnerability(5)).
        toEqual(brisco.Vulnerability.NorthSouth);
    });
    it('should say dealer east for board 6', function() {
        expect(brisco.Board.getDealer(6)).
        toEqual(brisco.Direction.East);
    });
    it('should say dealer south for board 15', function() {
        expect(brisco.Board.getDealer(15)).
        toEqual(brisco.Direction.South);
    });
});

describe('brisco.Suit', function() {
    it('should say spades is major', function() {
        expect(brisco.Suit.isMajor(brisco.Suit.Spades)).
        toEqual(true);
    });
    it('should say notrump is not major', function() {
        expect(brisco.Suit.isMajor(brisco.Suit.Notrump)).
        toEqual(false);
    });
    it('should say diamonds is minor', function() {
        expect(brisco.Suit.isMinor(brisco.Suit.Diamonds)).
        toEqual(true);
    });
    it('should say 30 points per trick for notrump', function() {
        expect(brisco.Suit.getPointsPerTrick(brisco.Suit.Notrump)).
        toEqual(30);
    });
});

describe('brisco.Card', function() {
    var d7 = {
        Denomination: brisco.Denomination.Seven,
        Suit: brisco.Suit.Diamonds
    };
    var d7_2 = {
        Denomination: brisco.Denomination.Seven,
        Suit: brisco.Suit.Diamonds
    };
    it('should say diamond seven is equal to diamond seven', function() {
        expect(brisco.Card.equals(d7, d7_2)).
        toEqual(true);
    });
});

var den = brisco.Denomination;
var s = brisco.Suit;
describe('brisco.Hand', function() {
    var hand = {
        Cards: []
    };
    hand.Cards.push({
        Denomination: den.Seven,
        Suit: s.Diamonds
    });
    hand.Cards.push({
        Denomination: den.Eight,
        Suit: s.Diamonds
    });
    hand.Cards.push({
        Denomination: den.Nine,
        Suit: s.Diamonds
    });
    hand.Cards.push({
        Denomination: den.Ten,
        Suit: s.Diamonds
    });
    hand.Cards.push({
        Denomination: den.Three,
        Suit: s.Clubs
    });
    hand.Cards.push({
        Denomination: den.Four,
        Suit: s.Clubs
    });
    hand.Cards.push({
        Denomination: den.Five,
        Suit: s.Clubs
    });
    hand.Cards.push({
        Denomination: den.Six,
        Suit: s.Spades
    });
    hand.Cards.push({
        Denomination: den.Seven,
        Suit: s.Spades
    });
    hand.Cards.push({
        Denomination: den.Eight,
        Suit: s.Spades
    });
    hand.Cards.push({
        Denomination: den.Jack,
        Suit: s.Spades
    });
    hand.Cards.push({
        Denomination: den.Queen,
        Suit: s.Spades
    });
    hand.Cards.push({
        Denomination: den.Ace,
        Suit: s.Hearts
    });

    it('should say hand complete when 13 cards', function() {
        expect(brisco.Hand.isComplete(hand)).
        toEqual(true);
    });
    it('should say hand contains spade queen', function() {
        expect(brisco.Hand.contains(hand, {
            Denomination: den.Queen,
            Suit: s.Spades
        })).
        toEqual(true);
    });
    it('should return heart ace as heart-suit', function() {
        var ha = {
            Denomination: den.Ace,
            Suit: s.Hearts
        };
        var suit = brisco.Hand.getCardsWithinSuit(hand, s.Hearts);
        expect(brisco.Card.equals(suit[0], ha)).toEqual(true);
    });
});

describe('brisco.Contract', function() {
    var c = Object.create(brisco.Contract);
    c.Level = 3;
    c.Suit = brisco.Suit.Diamonds;
    c.Tricks = 10;

    it('should say 3D with 10 is 1 overtrick', function() {
        expect(brisco.getOverTricks(c)).
        toEqual(1);
    });
    it('should say 3D with 10 is made contract', function() {
        expect(brisco.getContractMade(c)).
        toEqual(true);
    });
});