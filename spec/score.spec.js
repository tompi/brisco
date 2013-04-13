/*global describe,it,expect*/

var brisco = require('../client/js/brisco/briscoGame');
var score = require('../client/js/brisco/briscoScore');

describe('score', function() {

    it('should calculate GetNorthSouthScore_4HV10_equals_620', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 4;
        contract.Declarer = brisco.Direction.North;
        contract.Doubled = false;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Hearts;
        contract.Tricks = 10;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, true);
        expect(actual).toEqual(620);
    });
    it('should calculate GetNorthSouthScore_2DN7_equals_minus100', function() {
        var contract = { 
            Level: 2, 
            Player: brisco.Direction.North,
            Suit: brisco.Suit.Diamonds,
            Tricks: 7
        };
        var actual = score.getNorthSouthPointsWithVulnerability(contract, true);
        expect(actual).toEqual(-100);
    });
    it('should calculate GetNorthSouthScore_4HXV7_equals_minus800', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 4;
        contract.Declarer = brisco.Direction.North;
        contract.Doubled = true;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Hearts;
        contract.Tricks = 7;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, true);

        expect(actual).toEqual(-800);
    });

    it('should calculate GetNorthSouthScore_2HVW8_equals_minus110', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 2;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = false;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Hearts;
        contract.Tricks = 8;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, true);

        expect(actual).toEqual(-110);
    });

    it('should calculate GetNorthSouthScore_2HXNVW8_equals_minus470', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 2;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = true;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Hearts;
        contract.Tricks = 8;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, false);

        expect(actual).toEqual(-470);
    });

    it('should calculate GetNorthSouthScore_3NTVS11_equals_660', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 3;
        contract.Declarer = brisco.Direction.South;
        contract.Doubled = false;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Notrump;
        contract.Tricks = 11;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, true);

        expect(actual).toEqual(660);
    });

    it('should calculate GetNorthSouthScore_1DX8NVW_equals_minus240', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 1;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = true;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Diamonds;
        contract.Tricks = 8;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, false);

        expect(actual).toEqual(-240);
    });

    it('should calculate GetNorthSouthScore_5SXX12VW_equals_minus1600', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 5;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = true;
        contract.ReDoubled = true;
        contract.Suit = brisco.Suit.Spades;
        contract.Tricks = 12;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, true);

        expect(actual).toEqual(-1600);
    });

    it('should calculate GetNorthSouthScore_6NT13NVW_equals_minus1020', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 6;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = false;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Notrump;
        contract.Tricks = 13;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, false);

        expect(actual).toEqual(-1020);
    });

    it('should calculate GetNorthSouthScore_4D7NVW_equals_150', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 4;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = false;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Diamonds;
        contract.Tricks = 7;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, false);

        expect(actual).toEqual(150);
    });

    it('should calculate GetNorthSouthScore_4DX7NVW_equals_500', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 4;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = true;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Diamonds;
        contract.Tricks = 7;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, false);

        expect(actual).toEqual(500);
    });

    it('should calculate GetNorthSouthScore_4Dx7VW_equals_800', function() {
        var contract = Object.create(brisco.Contract);
        contract.Level = 4;
        contract.Declarer = brisco.Direction.West;
        contract.Doubled = true;
        contract.ReDoubled = false;
        contract.Suit = brisco.Suit.Diamonds;
        contract.Tricks = 7;
        var actual = score.getNorthSouthPointsWithVulnerability(contract, true);

        expect(actual).toEqual(800);
    });

});

describe('score.IMPCalculator', function() {
    it('should calculate GetNorthSouthIMPIntInt_100_equals_3', function() {
        var actual = score.getNorthSouthIMP(200, 100);

        expect(actual).toEqual(3);
    });
    it('should calculate GetNorthSouthIMPIntInt_minus100_equals_minus3', function() {
        var actual = score.getNorthSouthIMP(200, 300);

        expect(actual).toEqual(-3);
    });
    it('should calculate GetNorthSouthIMPIntInt_10_equals_0', function() {
        var actual = score.getNorthSouthIMP(430, 420);

        expect(actual).toEqual(0);
    });
    it('should calculate GetNorthSouthIMPIntInt_3990_equals_23', function() {
        var actual = score.getNorthSouthIMP(4010, 20);

        expect(actual).toEqual(23);
    });
    it('should calculate GetNorthSouthIMPIntInt_430_equals_10', function() {
        var actual = score.getNorthSouthIMP(800, 370);

        expect(actual).toEqual(10);
    });
    it('should calculate GetNorthSouthIMPIntInt_490_equals_10', function() {
        var actual = score.getNorthSouthIMP(800, 310);

        expect(actual).toEqual(10);
    });
    it('should calculate GetNorthSouthIMPIntInt_4000_equals_24', function() {
        var actual = score.getNorthSouthIMP(4300, 300);

        expect(actual).toEqual(24);
    });
    it('should calculate GetNorthSouthIMPIntInt_8000_equals_24', function() {
        var actual = score.getNorthSouthIMP(8000, 0);

        expect(actual).toEqual(24);
    });
    it('should calculate GetNorthSouthIMPContractContract', function() {
        var contractA = Object.create(brisco.Contract);
        contractA.Level = 4;
        contractA.Declarer = brisco.Direction.West;
        contractA.Doubled = true;
        contractA.ReDoubled = false;
        contractA.Suit = brisco.Suit.Diamonds;
        contractA.Tricks = 7;

        var contractB = Object.create(brisco.Contract);
        contractB.Level = 4;
        contractB.Declarer = brisco.Direction.West;
        contractB.Doubled = true;
        contractB.ReDoubled = false;
        contractB.Suit = brisco.Suit.Diamonds;
        contractB.Tricks = 8;

        var actual = score.getNorthSouthIMPWithBoardNumber(1, contractA, contractB);

        expect(actual).toEqual(5);
    });
});

describe('score.VP', function() {
    it('should calculate IMP0is15_15', function() {
        var actual = score.getWBFVP(0, 16);

        expect(actual[0]).toEqual(15);
        expect(actual[1]).toEqual(15);
    });

    it('should calculate IMP130is25_0', function() {
        var actual = score.getWBFVP(130, 16);

        expect(actual[0]).toEqual(25);
        expect(actual[1]).toEqual(0);
    });

    it('should calculate IMP20Boards20is19_11', function() {
        var actual = score.getWBFVP(20, 20);

        expect(actual[0]).toEqual(19);
        expect(actual[1]).toEqual(11);
    });

    it('should calculate IMP15Boards32is17_13', function() {
        var actual = score.getWBFVP(15, 32);

        expect(actual[0]).toEqual(17);
        expect(actual[1]).toEqual(13);
    });

    it('should calculate IMP45Boards9is25_2', function() {
        var actual = score.getWBFVP(45, 9);

        expect(actual[0]).toEqual(25);
        expect(actual[1]).toEqual(2);
    });

    it('should calculate IMP4Boards48is15_15', function() {
        var actual = score.getWBFVP(4, 48);

        expect(actual[0]).toEqual(15);
        expect(actual[1]).toEqual(15);
    });

    it('should calculate IMP4Boards52is15_15', function() {
        var actual = score.getWBFVP(4, 52);

        expect(actual[0]).toEqual(15);
        expect(actual[1]).toEqual(15);
    });

    it('should calculate IMP15Boards19is18_12', function() {
        var actual = score.getWBFVP(15, 18);

        expect(actual[0]).toEqual(18);
        expect(actual[1]).toEqual(12);
    });

    it('should calculate IMP25Boards13is22_8', function() {
        var actual = score.getWBFVP(25, 13);

        expect(actual[0]).toEqual(22);
        expect(actual[1]).toEqual(8);
    });

    it('should calculate IMP43Boards11is25_3', function() {
        var actual = score.getWBFVP(43, 11);

        expect(actual[0]).toEqual(25);
        expect(actual[1]).toEqual(3);
    });

});
