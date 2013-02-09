require.config({
    baseUrl: "../js/",
    paths: {
        "bootstrap": "lib/bootstrap",
        "angular": "lib/angular/angular.min",
        "underscore": "lib/underscore",
        "ui": "lib/angular/ui",
        "ui.bootstrap": "lib/angular/bootstrap"
    },
    shim: {
        underscore: { exports: '_' },
        angular: { exports: 'angular' },
        'ui.bootstrap': { deps: ['angular'] }
    }
});
