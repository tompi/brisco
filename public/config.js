require.config({
  baseUrl: "./",
  paths: {
    "jquery-ui": "../js/lib/jquery-ui",
    "bootstrap": "../js/lib/bootstrap",
    "angular": "../js/lib/angular/angular",
    "angular-resource": "../js/lib/angular/angular-resource",
    "underscore": "../js/lib/underscore",
    "ui": "../js/lib/angular/angular-ui",
    "ui.bootstrap": "../js/lib/angular/bootstrap",
    "tournamentService": "../js/api/tournament",
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
    'angular-resource': { deps: ['angular'] },
    'ui.bootstrap': { deps: ['angular'] },
    'ui': { deps: ['angular'] }
  }
});
