define(['angular', 'underscore', 'app'], function(angular, _, app) {
    app.controller('AccountDetailsCtrl', 
   ['$scope', '$http', function AccountDetailsCtrl ($scope, $http) { 
       $http.get('/api/myaccount').success(function(profile) {
           $scope.userProfile = profile;
           if (profile.photos && profile.photos.length) {
               $scope.imageUrl = profile.photos[0];
           } else {
               var raw = JSON.parse(profile._raw);
               if (raw.picture) {
                   $scope.imageUrl = raw.picture;
               }
           }
       });
    }]);
});