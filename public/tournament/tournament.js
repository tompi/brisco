require.config({
  baseUrl: "../js/",
  paths: {
    "jquery-ui": "lib/jquery-ui",
    "bootstrap": "lib/bootstrap",
    "angular": "lib/angular/angular",
    "underscore": "lib/underscore",
    "ui": "lib/angular/angular-ui",
    "ui.bootstrap": "lib/angular/bootstrap"
  },
  shim: {
    underscore: { exports: '_' },
    angular: { exports: 'angular' },
    'ui.bootstrap': { deps: ['angular'] },
    'ui': { deps: ['angular'] }
  }
});


var globalTournament = {
  name: 'Thursday club night',
  pairs: [{
    no: 1,
    ne: "John Forrester",
    sw: "Aylene Joleen"
  }, {
    no: 2,
    ne: "Wayne Schmayne",
    sw: "Wolum Holum"
  }],
  boards: [
    { no: 1, results: [ 
      { ew: 1, ns: 2, contract: {
    Level: 4, Player: 'North', Tricks: 11
  }
  }]
  },
  { no: 2, results: [ 
    { ew: 1, ns: 2, contract: { Level: 3, Player: 'South', Tricks: 8 }},
    { ew: 3, ns: 4, contract: { Level: 1, Player: 'South', Tricks: 8 }}
  ]
  }
  ],
  startDate: new Date()
};
function BoardsCtrl($scope) {
  $scope.boards = globalTournament.boards;
  $scope.activeBoard = $scope.boards[0];
  $scope.setActiveBoard = function(board) {
    $scope.activeBoard = board;
  };
}
function SetupCtrl($scope) {
  $scope.tournament = globalTournament;
}
function TournamentCtrl($scope) {
  $scope.tournament = globalTournament;
}
function PairsCtrl($scope) {
  $scope.pairs = globalTournament.pairs;

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


require(["jquery", "underscore", "jquery-ui", "bootstrap", "angular", "ui", "ui.bootstrap", "../tournament/app"], function($, _) {
  $(function() {
    angular.bootstrap(document, ['ui.bootstrap', 'ui']);
  });
});
