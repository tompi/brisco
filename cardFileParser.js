exports.pbn = (function() {

    var me = {};

    me.parse = function(file) {
        var deals = [];
        var lines = file.split(/\r?\n/);
        var deal = {};
        var line;
        for (var i = 0; i<lines.length; i++) {
            line = lines[i];
            if (line.substr(0,7) == "[Board ") {
                deal.boardNr = parseInt(line.split('"')[1]);
            } else if (line.substr(0,6) == "[Deal ") {
                deal.deal = line.split('"')[1];
            }
            if (deal.boardNr && deal.deal) {
                deals.push(deal);
                deal = {};                
            }
        }
        return deals;
    };
    
    return me;
})();