var db = (function() {
    var baseUrl = '/api/';
    var me = {};    
    
    me.createTournament = function(next) {
        callApi('createTournament', {}, next);   
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