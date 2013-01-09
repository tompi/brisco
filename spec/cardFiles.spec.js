var cardFileParser = require('../cardFileParser');
var path = require("path");
var fs = require("fs");
var pbnFile = fs.readFileSync(__dirname + "/CardFiles/test1.pbn", "utf-8");
describe('cardFileParser.pbn', function() {
    var deals = cardFileParser.pbn.parse(pbnFile);
    it('should parse 32 deals from pbnFile', function() {
        expect(deals.length).toEqual(32);
    });
    it('should parse deal 1 correctly', function() {
        expect(deals[0].deal).toEqual("N:752.AK9.A842.Q86 KQ94.JT876.95.KJ J83.4.K73.T97542 AT6.Q532.QJT6.A3");
    });
});