require.config({
  baseUrl: "./",
  paths: {
    "jquery-ui": "../js/lib/jquery-ui",
    "bootstrap": "../js/lib/bootstrap",
    "angular": "../js/lib/angular/angular",
    "md5": "../js/lib/md5",
    "gravatarService": "../js/services/gravatarService",
    "angular-resource": "../js/lib/angular/angular-resource",
    "underscore": "../js/lib/underscore",
    "ui": "../js/lib/angular/angular-ui",
    "ui.bootstrap": "../js/lib/angular/bootstrap",
    "ngUpload": "../js/lib/angular/ngUpload",
    "tournamentResource": "../js/api/tournament",
    "tournamentsResource": "../js/api/tournaments",
    "briscoGame": "../js/brisco/briscoGame",
    "briscoScore": "../js/brisco/briscoScore",
    "briscoHtml": "../js/brisco/briscoHtml",
    "pbnEntities": "../js/brisco/pbn/entities",
    "text": "../js/lib/require-text",
    "briscoContractEditor": "../js/directives/contractEditor"
  },
  shim: {
    underscore: { exports: '_' },
    angular: { exports: 'angular' },
    md5: { exports: 'md5' },
    'angular-resource': { deps: ['angular'] },
    'ui.bootstrap': { deps: ['angular'] },
    'ngUpload': { deps: ['angular'] },
    'ui': { deps: ['angular'] }
  }
});
