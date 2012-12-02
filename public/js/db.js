var db = (function() {
    var baseUrl = '/api/';
    var me = {};
    
    me.tournament = {};

    me.tournament.findById = function(id, next) {
        callApi('tournament/findById', {id: id}, next);   
    };

    me.tournament.findAll = function(next) {
        callApi('tournament/findAll', {}, next);   
    };
    
    me.tournament.create = function(club, next) {
        callApi('tournament/create', {club: club}, next);   
    };

    me.tournament.addPair = function(tournamentId, pair, next) {
        callApi('tournament/addPair', {tournamentId: tournamentId, pair: pair}, next);   
    };
    
    function callApi(method, data, next) {
        $.ajax({
            url: baseUrl + method,
            success: next,
            data: data
        });
    }
    
    return me;
})();