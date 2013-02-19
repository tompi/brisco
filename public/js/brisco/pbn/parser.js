if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./entities', 'xregexp'], function(entities, xregexp) {
    xregexp = xregexp.XRegExp;

    var me = {};
    var lineRegExp = xregexp('\\[(?<tagName>[a-zA-Z]+)\\ +"(?<content>[^"]+)"\\]', 'x');
    //  1  -  3 2 "N-S"  50 "Magne Tønnessen - Dagfinn Iversen"                21 "Rekrutteringsklubben Ruter 7 - Kristiansands BK" "11925" "39066" "M" "M"
    // Rank\2R;RankTie\2R;PairId\2R;Table\1R;Direction\5R;TotalScoreIMP\3R;Names\50L;NrBoards\2R;Club\49L;MemberID1\7R;MemberID2\7R;Sex1\3R;Sex2\3R"]
    me.parse = function(file) {
        var t = {};
        var deals = [];
        t.boards = [];
        var currentBoardNo;
        var lines = file.split(/\r?\n/);
        var deal = {};
        var line;
        for (var i = 0; i < lines.length; i++) {

            line = lines[i];
            var match = xregexp.exec(line, lineRegExp);
            if (match) {
                switch (match.tagName) {
                case "Board":
                    deal.boardNr = parseInt(match.content, 10);
                    currentBoardNo = deal.boardNr;
                    break;
                case "Deal":
                    deal.deal = match.content;
                    break;
                case "Event":
                    t.name = match.content;
                    break;
                case "TotalScoreTable":
                    t.pairs = parsePeople(match.content, lines, i + 1);
                    break;
                case "ScoreTable":
                    t.boards.push({
                        no: currentBoardNo,
                        results: parseBoardResults(match.content, lines, i + 1)
                    });
                    break;
                case "EventDate":
                    var a = match.content.split('.');
                    t.a = a;
                    t.eventDate = new Date(parseInt(a[0], 10), parseInt(a[1], 10)-1, parseInt(a[2],10), 0, 0, 0, 0);
                    break;
                case "Scoring":
                    t.scoring = match.content;
                    break;
                }
            }
            if (deal.boardNr && deal.deal) {
                deals.push(deal);
                deal = {};
            }
        }
        t.deals = deals;
        return t;
    };

    function parseBoardResults(format, lines, ix) {
        var formats = parseFormat(format);
        var ret = [];
        var line = lines[ix];
        while (line && line[0] !== '[') {
            ret.push(parseResult(line, formats));
            ix++;
            line = lines[ix];
        }
        return ret;
    }

    function parseResult(line, formats) {
        var ret = {};
        for (var i = 0; i < formats.length; i++) {
            var f = formats[i];
            var s = line.substr(f.start, f.stop - f.start);
            switch (f.name) {
            case "PairId_NS":
                ret.ns = parseInt(s, 10);
                break;
            case "PairId_EW":
                ret.ew = parseInt(s, 10);
                break;
            case "Contract":
                ret.contract = entities.getContractFromString(s);
                break;
            case "Declarer":
                // Assumes contract comes first...
                ret.contract.Declarer = entities.getDeclarerFromString(s);
                break;
            case "Result":
                ret.contract.Tricks = parseInt(s, 10);
                break;
            }
        }
        return ret;
    }

    function parsePbnContract(s) {
        var ret = {};
        if (s[0] == 'P') {
            ret.Level = 0;
        }
        else {

        }
        return ret;
    }

    function parsePeople(format, lines, ix) {
        var formats = parseFormat(format);
        var ret = [];
        var line = lines[ix];
        while (line[0] != '[') {
            ret.push(parsePair(line, formats));
            ix++;
            line = lines[ix];
        }
        return ret;
    }

    function parsePair(line, formats) {
        var ret = {};
        for (var i = 0; i < formats.length; i++) {
            var f = formats[i];
            var s = line.substr(f.start, f.stop - f.start);
            switch (f.name) {
            case "PairId":
                ret.no = parseInt(s, 10);
                break;
            case "Names":
                var n = parsePbnString(s).split(' - ');
                ret.ne = n[0];
                ret.sw = n[1];
                break;
            case "Club":
                var c = parsePbnString(s);
                var clubNe = c;
                var clubSw = c;
                if (c.indexOf(' - ')) {
                    c = c.split(' - ');
                    clubNe = c[0];
                    clubSw = c[1];
                }
                ret.neClub = clubNe;
                ret.swClub = clubSw;
                break;
            }
        }
        return ret;
    }

    function parsePbnString(s) {
        var start = s.indexOf('"') + 1;
        var length = s.lastIndexOf('"') - start;
        return s.substr(start, length).trim();
    }

    function parseFormat(format) {
        var a = format.split(';');
        var ret = [];
        var start = 0;
        for (var i = 0; i < a.length; i++) {
            var f = parseFormatColumn(a[i], start);
            start = f.stop + 1;
            ret.push(f);
        }
        return ret;
    }

    function parseFormatColumn(column, start) {
        var a = column.split('\\');
        return {
            start: start,
            name: a[0],
            stop: start + parseInt(a[1].substr(0, a[1].length - 1), 10),
            type: a[1][a[1].length - 1]
        };
    }

    me.test = {
        parseFormat: parseFormat,
        parseFormatColumn: parseFormatColumn,
        parsePair: parsePair
    };

    return me;
});