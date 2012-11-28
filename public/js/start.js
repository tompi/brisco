$(function() {
    $('#createTournament').on('click', function() {
        db.createTournament(function(data) {
            alert(data);
        })
    });
});
