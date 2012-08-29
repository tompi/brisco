(function() {
		var brisco = {};
		if (typeof exports !== 'undefined') {
				if (typeof module !== 'undefined' && module.exports) {
						exports = module.exports = brisco;
				}
				exports.brisco = brisco;
		} else {
				root['brisco'] = brisco;
		}

		brisco.Board = {
				GetVulnerability: function(boardNumber) {
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

				GetDealer: function(boardNumber) {
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
      West: 4,
      IsNorthSouth: function(direction) {
        return direction === this.North || direction === this.South;
      }
    };

    brisco.Vulnerability = {
      None: 1,
      Both: 2,
      NorthSouth: 3,
      EastWest: 4,
      IsVulnerable: function(vulnerability, direction) {
        if (vulnerability === this.None) return false;
        if (vulnerability === this.Both) return true;
        if (vulnerability === this.NorthSouth) 
          return brisco.Direction.IsNorthSouth(direction);
        return !brisco.Direction.IsNorthSouth(direction);
      }
    };

		// Current version.
		brisco.VERSION = '0.0.1';
}).call(this);
