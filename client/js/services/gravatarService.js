define(['app', 'md5'],
function(app, md5) {
    app.
    factory('$gravatarService', function() {
        var me = {};
        me.getProfileImageUrl = function(email) {
            var cleanedEmail = email.toLowerCase().trim();
            var hash = md5.hash(cleanedEmail);
            return '//www.gravatar.com/avatar/' + hash + '?s=200';
        };
        return me;
    });
});
