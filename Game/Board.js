var Board = {
  Number: null,
	Vulnerability: null,
	Dealer: null,
	Deal Deal;

	GetVulnerability: function(boardNumber) {
		var vulnMod = boardNumber % 16;
		switch (vulnMod) {
		case 1:
		case 8:
		case 11:
		case 14:
			return Game.Vulnerability.None;
		case 4:
		case 7:
		case 10:
		case 13:
			return Game.Vulnerability.Both;
		case 3:
		case 6:
		case 9:
		case 0:
			return Game.Vulnerability.EastWest;
		default:
			return Game.Vulnerability.NorthSouth;
		}
	}

	GetDealer: function(boardNumber) {
		var dealerMod = boardNumber % 4;
		switch (dealerMod) {
		case 1:
			return Game.Direction.North;
		case 2:
			return Game.Direction.East;
		case 3:
			return Game.Direction.South;
		default:
			return Game.Direction.West;
		}
	}

	init: function(boardNumber) {
		Number = boardNumber;
		Dealer = GetDealer(boardNumber);
		Vulnerability = GetVulnerability(boardNumber);
	}
}
