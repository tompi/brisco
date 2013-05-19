
require(["../config"], function() {
    require(["jquery", "underscore", "jquery-ui", "bootstrap", "angular", "angular-resource", "ui", "ui.bootstrap", "app", 'AccountDetailsCtrl'], 
    function($, _, ui, bs, angular) {
        $(function() {
            angular.bootstrap(document, ['myaccount', 'ui.bootstrap', 'ui']);
        });
    });
});
