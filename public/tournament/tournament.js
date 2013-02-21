require.config({
  baseUrl: "../js/",
  paths: {
    "jquery-ui": "lib/jquery-ui",
    "bootstrap": "lib/bootstrap",
    "angular": "lib/angular/angular",
    "angular-resource": "lib/angular/angular-resource",
    "underscore": "lib/underscore",
    "ui": "lib/angular/angular-ui",
    "ui.bootstrap": "lib/angular/bootstrap",
    "tournamentService": "api/tournament",
    "app": "../tournament/app",
    "briscoGame": "brisco/briscoGame",
    "briscoScore": "brisco/briscoScore",
    "briscoHtml": "brisco/briscoHtml",
    "pbnEntities": "brisco/pbn/entities"
  },
  shim: {
    underscore: { exports: '_' },
    angular: { exports: 'angular' },
    'angular-resource': { deps: ['angular'] },
    'ui.bootstrap': { deps: ['angular'] },
    'ui': { deps: ['angular'] }
  }
});


function BoardsCtrl($scope, tournamentResource) {
  tournamentResource.getTournament(function(t){
    $scope.boards = t.boards;
    $scope.activeBoard = $scope.boards[0];
  });
  
  $scope.setActiveBoard = function(board) {
    $scope.activeBoard = board;
  };
}
function SetupCtrl($scope, tournamentResource) {
  tournamentResource.getTournament(function(t){
    $scope.tournament = t;
  });
}
function CardsCtrl($scope, tournamentResource) {
  tournamentResource.getTournament(function(t){
    $scope.deals = t.deals;
  });
}
function TournamentCtrl($scope, tournamentResource) {
  $scope.tournamentLoaded = false;
  tournamentResource.getTournament(function(t){
    $scope.tournament = t;
    $scope.tournamentLoaded = true;
  });
}
function PairsCtrl($scope, tournamentResource) {
  tournamentResource.getTournament(function(t){
    $scope.pairs = t.pairs;
  });
  $scope.addPair = function() {
    $scope.pairNo= $scope.getNextPairNo();
    $scope.shouldBeOpen = true;
  };
  $scope.editPair = function(pairNo) {
    var pairToEdit = $scope.findPair(pairNo);
    if (pairToEdit) {
      $scope.pairNo= pairToEdit.no;
      $scope.nameNE= pairToEdit.ne;
      $scope.nameSW= pairToEdit.sw;
    }
    $scope.shouldBeOpen = true;
  };
  $scope.close = function() {
    $scope.pairNo = '';
    $scope.nameNE = '';
    $scope.nameSW = '';
    $scope.shouldBeOpen = false;
  };
  $scope.findPair = function(pairNo) {
    return _.find($scope.pairs, function(p) {
      return p.no == pairNo;
    });
  };
  $scope.getNextPairNo = function() {
    var i = 1;
    while ($scope.findPair(i)) {
      i++;        
    }
    return i;
  };
  $scope.savePair = function() {
    var pairToSave = $scope.findPair($scope.pairNo);
    if (pairToSave) {
      pairToSave.no = $scope.pairNo;
      pairToSave.ne = $scope.nameNE;
      pairToSave.sw = $scope.nameSW; 
    } else {
      $scope.pairs.push({
        no: $scope.pairNo,
        ne: $scope.nameNE,
        sw: $scope.nameSW
      });
    }
    $scope.close();
  };

  $scope.removePair = function(index) {
    $scope.pairs.splice(index, 1);
  };
}


require(["jquery", "underscore", "jquery-ui", "bootstrap", "angular", "angular-resource", "ui", "ui.bootstrap", "app", "tournamentService"], function($, _, ui, bs, angular) {
  $(function() {    
    angular.bootstrap(document, ['psa', 'ui.bootstrap', 'ui']);
    $('body').removeClass('hide');
  });
});
