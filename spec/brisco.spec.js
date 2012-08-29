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
