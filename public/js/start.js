$(function() {
    $('#createTournament').on('click', function() {
        alertify.prompt( 'Please give the tournament a name.', function (e, str) {
            if (e) {
                db.createTournament(str, function(data) {
                    document.location = '/tournament#' + data;
                })        
        	} 
        });        
    });
});

function StartCtrl($scope) {
    db.tournament.findAll(function(tournaments) {
        $scope.tournaments = tournaments;
    });
}
