/*global describe,it,expect*/

var cardFileParser = require('../public/js/brisco/pbn/parser');
var pbnEntities = require('../public/js/brisco/pbn/entities');
var briscoGame = require('../public/js/brisco/briscoGame');
var _ = require("underscore");
var fs = require("fs");
var pbnFile = fs.readFileSync(__dirname + "/CardFiles/test1.pbn", "utf-8");
var pbnFile2 = fs.readFileSync(__dirname + "/CardFiles/ruter71.pbn", "utf-8");
describe('cardFileParser.pbn', function() {
    var deals = cardFileParser.parse(pbnFile).deals;
    it('should parse 32 deals from pbnFile', function() {
        expect(deals.length).toEqual(32);
    });
    it('should parse deal 1 correctly', function() {
        expect(deals[0].deal).toEqual("752.AK9.A842.Q86 KQ94.JT876.95.KJ J83.4.K73.T97542 AT6.Q532.QJT6.A3");
        expect(deals[0].boardNr).toEqual(1);        
    });
});
describe('ruter71.pbn', function() {
    var t = cardFileParser.parse(pbnFile2);
    it('should parse 21 deals from pbnFile', function() {
        expect(t.deals.length).toEqual(21);
    });    
    it('should parse 16 pairs from pbnFile', function() {
        expect(t.pairs.length).toEqual(16);
    });
    it('should parse pair no 6 as Thomas and Nina', function() {
        var pair6 = _.find(t.pairs, function(p) {return p.no == 6;});
        expect(pair6.sw).toEqual('Thomas Haukland');
        expect(pair6.ne).toEqual('Nina Skoland Kaspersen');
    });
    it('should parse first result of board 10 as 2HX', function() {
        var res = _.find(t.boards, function(b) {return b.no == 10;});
        var r = res.results[0];
        var c = r.contract;
        expect(c.Level).toEqual(2);
        expect(c.Suit).toEqual(briscoGame.Suit.Hearts);
        expect(!!c.Doubled).toEqual(true);
        expect(!!c.ReDoubled).toEqual(false);
        expect(c.Declarer).toEqual(briscoGame.Direction.West);
        expect(c.Tricks).toEqual(7);
        expect(r.scoreNs).toEqual(200);
        expect(r.resultNs).toEqual(5);
        expect(r.resultEw).toEqual(-5);
        expect(r.table).toEqual(2);
    });
    it('should parse date as 2012.01.24', function() {
        expect(t.eventDate.getFullYear()).toEqual(2012);
        expect(t.eventDate.getMonth()).toEqual(0);
        expect(t.eventDate.getDate()).toEqual(24);
    });
});
describe('parser', function() {
    var formats = cardFileParser.test.parseFormat('Rank\\2R;RankTie\\2R;PairId\\2R;Table\\1R;Direction\\5R;TotalScoreIMP\\3R;Names\\50L;NrBoards\\2R;Club\\49L;MemberID1\\7R;MemberID2\\7R;Sex1\\3R;Sex2\\3R');
    it('should parse Names as start=21 and stop=71', function() {
        var namesFormat = _.find(formats, function(f) {return f.name === 'Names';});
        expect(namesFormat.start).toEqual(21);
        expect(namesFormat.stop).toEqual(71);
    });
});
var h = briscoGame.Hand;
var d = briscoGame.Direction;
describe('entities', function() {
    var deal = pbnEntities.parseDeal('752.AK9.A842.Q86 KQ94.JT876.95.KJ J83.4.K73.T97542 AT6.Q532.QJT6.A3');
    var north = deal[d.North];
    var east = deal[d.East];
    var south = deal[d.South];
    var west = deal[d.West];
    it('should parse ace of spades as first card in west hand', function() {
        expect(west.Cards[0].Denomination).toEqual(briscoGame.Denomination.Ace);
        expect(west.Cards[0].Suit).toEqual(briscoGame.Suit.Spades);
    });
    it('should parse jack of spades in south hand', function() {
        var SJ = { Denomination: briscoGame.Denomination.Jack, Suit: briscoGame.Suit.Spades};
        expect( h.contains(south, SJ)).toEqual(true);
    });
    it('should parse 4 complete hands', function() {
        expect(h.isComplete(north)).toEqual(true);
        expect(h.isComplete(east)).toEqual(true);
        expect(h.isComplete(south)).toEqual(true);
        expect(h.isComplete(west)).toEqual(true);
    })
});