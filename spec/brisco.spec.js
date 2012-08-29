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

