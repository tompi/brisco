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
      toEqual(brisco.Vulnerability.None );
  });
  it('should say NorthSouth vulnerable for board 5', function() {
    expect(brisco.Board.getVulnerability(5)).
      toEqual(brisco.Vulnerability.NorthSouth );
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
  var d7 = Object.create(brisco.Card);
  d7.Denomination = brisco.Denomination.Seven;
  d7.Suit = brisco.Suit.Diamonds;
  it('should say null is not equal to diamond seven', function() {
    expect(d7.equals(null)).
      toEqual(false);
  });
});

describe('brisco.Hand', function() {
    var hand = Object.create(brisco.Hand);
  var d7 = Object.create(brisco.Card);
  d7.Denomination = brisco.Denomination.Seven;
  d7.Suit = brisco.Suit.Diamonds;
  hand.add(d7);
  var d8 = Object.create(brisco.Card);
  d8.Denomination = brisco.Denomination.Eight;
  d8.Suit = brisco.Suit.Diamonds;
  hand.add(d8);
  var d9 = Object.create(brisco.Card);
  d9.Denomination = brisco.Denomination.Nine;
  d9.Suit = brisco.Suit.Diamonds;
  hand.add(d9);
  var dT = Object.create(brisco.Card);
  dT.Denomination = brisco.Denomination.Ten;
  dT.Suit = brisco.Suit.Diamonds;
  hand.add(dT);
  var c3 = Object.create(brisco.Card);
  c3.Denomination = brisco.Denomination.Three;
  c3.Suit = brisco.Suit.Clubs;
  hand.add(c3);
  var c4 = Object.create(brisco.Card);
  c4.Denomination = brisco.Denomination.Four;
  c4.Suit = brisco.Suit.Clubs;
  hand.add(c4);
  var c5 = Object.create(brisco.Card);
  c5.Denomination = brisco.Denomination.Five;
  c5.Suit = brisco.Suit.Clubs;
  hand.add(c5);
  var s6 = Object.create(brisco.Card);
  s6.Denomination = brisco.Denomination.Six;
  s6.Suit = brisco.Suit.Spades;
  hand.add(s6);
  var s7 = Object.create(brisco.Card);
  s7.Denomination = brisco.Denomination.Seven;
  s7.Suit = brisco.Suit.Spades;
  hand.add(s7);
  var s8 = Object.create(brisco.Card);
  s8.Denomination = brisco.Denomination.Eight;
  s8.Suit = brisco.Suit.Spades;
  hand.add(s8);
  var sJ = Object.create(brisco.Card);
  sJ.Denomination = brisco.Denomination.Jack;
  sJ.Suit = brisco.Suit.Spades;
  hand.add(sJ);
  var sQ = Object.create(brisco.Card);
  sQ.Denomination = brisco.Denomination.Queen;
  sQ.Suit = brisco.Suit.Spades;
  hand.add(sQ);
  var hA = Object.create(brisco.Card);
  hA.Denomination = brisco.Denomination.Ace;
  hA.Suit = brisco.Suit.Hearts;
  hand.add(hA);
  
  it('should say hand complete when 13 cards', function() {
    expect(hand.isComplete()).
      toEqual(true);
  });
  it('should say hand contains spade queen', function() {
    expect(hand.contains(sQ)).
      toEqual(true);
  });
  it('should say return heart ace as heart-suit', function() {
    expect(hand.getCardsWithinSuit(brisco.Suit.Hearts).equals(hA)).
      toEqual(true);
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