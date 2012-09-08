var brisco = require('./Game');

(function() {
    var score = {};
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = score;
        }
        exports.brisco = score;
    }
    else {
        root['score'] = score;
    }
    
    var DOUBLED_NOZONE = [ -100, -300, -500, -800,-1100, -1400, -1700, -2000, -2300, -2600, -2900, -3200, -3500 ];
	var DOUBLED_ZONE = [ -200, -500, -800, -1100,	-1400, -1700, -2000, -2300, -2600, -2900, -3200, -3500, -3800 ];
	var REDOUBLED_NOZONE = [ -200, -600, -1000, -1600, -2200, -2800, -3400, -4000, -4600, -5200, -5800, -6400, -7000 ];
	var REDOUBLED_ZONE = [ -400, -1000, -1600, -2200, -2800, -3400, -4000, -4600, -5200, -5800, -6400, -7000, -7600 ];
    var IMP = [ 10, 40, 80, 120, 160, 210, 260, 310, 360, 420, 490, 590, 740, 890, 1090, 
                1290, 1490, 1740, 1990, 2040, 2490, 2990, 3490, 3990 ];
    var WBF_BOARDS = [ 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48 ];
	var WBF_POINTS = [[15, 15],[16, 14],[17, 13],[18, 12],[19, 11],[20, 10],[21, 9],[22, 8],[23, 7],[24, 6],[25, 5],[25, 4],[25, 3],[25, 2],[25, 1],[25, 0]];
	// From WBF 2010
	var WBF_IMP = [
			[ 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4 ],
			[ 5, 6, 6, 7, 7, 8, 9, 10, 10, 11, 11, 12 ],
			[ 8, 9, 9, 10, 11, 12, 14, 15, 16, 17, 18, 20 ],
			[ 11, 12, 12, 14, 15, 16, 19, 20, 22, 23, 25, 28 ],
			[ 14, 15, 16, 18, 19, 21, 24, 25, 28, 29, 32, 36 ],
			[ 17, 18, 20, 22, 23, 26, 29, 31, 34, 36, 39, 44 ],
			[ 20, 21, 24, 26, 27, 31, 34, 37, 40, 43, 46, 52 ],
			[ 23, 25, 28, 30, 31, 36, 39, 43, 46, 50, 53, 60 ],
			[ 26, 29, 32, 34, 36, 41, 45, 49, 52, 57, 60, 68 ],
			[ 29, 33, 36, 38, 41, 47, 51, 55, 58, 64, 68, 76 ],
			[ 33, 37, 40, 43, 46, 53, 57, 61, 65, 71, 76, 84 ],
			[ 37, 41, 45, 48, 52, 59, 64, 68, 73, 79, 84, 93 ],
			[ 41, 45, 50, 54, 58, 65, 71, 76, 82, 88, 93, 102 ],
			[ 45, 50, 55, 60, 64, 72, 79, 85, 91, 97, 102, 112 ],
			[ 51, 55, 61, 66, 71, 79, 87, 94, 100, 106, 112, 123 ]];

	score.getNorthSouthPointsWithBoardNo = function(contract, boardNumber) {
		var direction = brisco.Direction.North;
		if (contract.Player !== null) {
			direction = contract.Player;
		}
		var vulnerability = brisco.Board.getVulnerability(boardNumber);
        var vulnerable = brisco.Vulnerability.isVulnerable(vulnerability, direction);
		return score.getNorthSouthPointsWithVulnerability(contract, vulnerable);
	};

	score.getNorthSouthPointsWithVulnerability = function(contract, vulnerable) {
		var points = score.getPoints(contract, vulnerable);
		// Check if this score was indeed for east-west :)
		if (contract.Player !== null) {
			if (!brisco.isNorthSouth(contract.Player)) {
				points = points * -1;
			}
		}
		return points;
	};

	score.getPoints = function(contract, vulnerable) {
		if (contract.Level < 1) {
			return 0;
		}

		var points = 0;

		if (brisco.getContractMade(contract)) {
			points = score.getContractPoints(contract);
			points += score.getLevelBonus(contract, vulnerable, points, false);
			points += score.getInsultBonus(contract);
			points += score.getOverTrickPoints(contract, vulnerable);
		} else {
			points = score.getPenalty(contract, vulnerable);
		}
		return points;
	};

	score.getContractPoints = function(contract) {
		if (!brisco.getContractMade(contract)) {
			return 0;
		}
		var extraPoints = brisco.Suit.getExtraPointsForFirstTrick(contract.Suit);
		var basePoints = brisco.Suit.getPointsPerTrick(contract.Suit);

		if (contract.ReDoubled) {
			extraPoints *= 4;
			basePoints *= 4;
		} else if (contract.Doubled) {
			extraPoints *= 2;
			basePoints *= 2;
		}

		return basePoints * contract.Level + extraPoints;
	};

	score.getLevelBonus = function(contract, vulnerable, contractPoints, rubberScoring) {
		if (contractPoints < 100) {
			return rubberScoring ? 0 : 50;
		}
		// At least game:
		var points = rubberScoring ? 0 : vulnerable ? 500 : 300;

		if (brisco.isGrandSlam(contract)) {
			points += vulnerable ? 1500 : 1000;
		} else if (brisco.isSmallSlam(contract)) {
			points += vulnerable ? 750 : 500;
		}
		return points;
	};

	score.getInsultBonus = function(contract) {
		if (brisco.getContractMade(contract)) {
			if (contract.ReDoubled) {
				return 100;
			} else if (contract.Doubled) {
				return 50;
			}
		}
		return 0;
	};

	score.getOverTrickPoints = function(contract, vulnerable) {
		var overTricks = brisco.getOverTricks(contract);
		if (overTricks < 1) {
			return 0;
		} else {
			if (contract.ReDoubled) {
				return overTricks * (vulnerable ? 400 : 200);
			} else if (contract.Doubled) {
				return overTricks * (vulnerable ? 200 : 100);
			} else {
				return overTricks * brisco.Suit.getPointsPerTrick(contract.Suit);
			}
		}
	};

	score.getPenalty = function(contract, vulnerable) {
		if (brisco.getContractMade(contract)) {
			return 0;
		}
		var diff = brisco.getOverTricks(contract);
		var nsScore = 0;
		var ix = -1 * (diff + 1);
		if (contract.ReDoubled) {
			if (vulnerable) {
				nsScore = REDOUBLED_ZONE[ix];
			} else {
				nsScore = REDOUBLED_NOZONE[ix];
			}
		} else if (contract.Doubled) {
			if (vulnerable) {
				nsScore = DOUBLED_ZONE[ix];
			} else {
				nsScore = DOUBLED_NOZONE[ix];
			}
		} else {
			if (vulnerable) {
				nsScore = diff * 100;
			} else {
				nsScore = diff * 50;
			}
		}
		return nsScore;
	};
    
    score.getNorthSouthIMP = function(northPointsTableA, northPointsTableB) {
		var diff = northPointsTableA - northPointsTableB;
		if (diff === 0) {
			return 0;
		}
		var absDiff = Math.abs(diff);
		var ix = 0;
		// Find first entry in table that is smaller or equal to diff
		while (ix < IMP.length) {
			if (absDiff <= IMP[ix]) {
				break;
			}
			ix++;
		}
		// Correct sign:
		if (diff < 0) {
			ix = ix * -1;
		}
		return ix;
	};

	score.getNorthSouthIMPWithBoardNumber = function(boardNumber, contractTableA, contractTableB) {
		return score.getNorthSouthIMP(
				score.getNorthSouthPointsWithBoardNo(contractTableA, boardNumber),
				score.getNorthSouthPointsWithBoardNo(contractTableB, boardNumber));
	};
    
    score.getWBFVP = function(imps, boards) {
		if (imps < 0) {
			imps = imps * -1;
		}
		var imp_table_index = getWBFImpTableIndex(boards);
		var i = 0;
		while (i < 15) {
			if (imps <= WBF_IMP[i][imp_table_index]) {
				break;
			}
			i++;
		}
		return WBF_POINTS[i];
	};

	function getWBFImpTableIndex(boards) {
		var i = 1;
		while (i < 12) {
			var maxBoards = WBF_BOARDS[i];
			if (boards < maxBoards) {
				break;
			}
			i++;
		}
		return i - 1;
	}

}).call(this);