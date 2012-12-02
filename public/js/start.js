$(function() {
    $('#createTournament').on('click', function() {
        db.createTournament(function(data) {
            document.location = '/tournament#' + data;
        })
    });
});
