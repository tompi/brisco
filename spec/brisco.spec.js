var brisco = require('../Game/Game');

describe('brisco.Direction', function() {
  it('should say north is northsouth', function() {
    expect(brisco.Direction.IsNorthSouth(brisco.Direction.North)).
      toEqual(true);
  });
  it('should say west is not northsouth', function() {
    expect(brisco.Direction.IsNorthSouth(brisco.Direction.West)).
      toEqual(false);
  });
});

describe('brisco.Vulnerabillity', function() {
  it('should say north is vulnerable when both', function() {
    expect(brisco.Vulnerability.IsVulnerable(brisco.Vulnerability.Both, brisco.Direction.North)).
      toEqual(true);
  });
  it('should say north is not vulnerable when eastwest', function() {
    expect(brisco.Vulnerability.IsVulnerable(brisco.Vulnerability.EastWest, brisco.Direction.North)).
      toEqual(false);
  });
});

describe('brisco.Board', function() {
  it('should say None vulnerable for board 1', function() {
    expect(brisco.Board.GetVulnerability(1)).
      toEqual(brisco.Vulnerability.None );
  });
  it('should say NorthSouth vulnerable for board 5', function() {
    expect(brisco.Board.GetVulnerability(5)).
      toEqual(brisco.Vulnerability.NorthSouth );
  });
  it('should say dealer east for board 6', function() {
    expect(brisco.Board.GetDealer(6)).
      toEqual(brisco.Direction.East);
  });
  it('should say dealer south for board 15', function() {
    expect(brisco.Board.GetDealer(15)).
      toEqual(brisco.Direction.South);
  });
});

describe('brisco.Suit', function() {
  it('should say spades is major', function() {
    expect(brisco.Suit.IsMajor(brisco.Suit.Spades)).
      toEqual(true);
  });
});