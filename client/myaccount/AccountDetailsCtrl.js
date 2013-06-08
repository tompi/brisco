define(['angular', 'underscore', 'app', 'gravatarService'], function(angular, _, app) {
    app.controller('AccountDetailsCtrl', 
   ['$scope', '$http', '$gravatarService', function AccountDetailsCtrl ($scope, $http, $gravatarService) { 
       $http.get('/api/myaccount').success(function(profile) {
           $scope.userProfile = profile;
           if (profile.photos && profile.photos.length) {
               // Get image from profile
               $scope.imageUrl = profile.photos[0];
           } else {
               var raw = JSON.parse(profile._raw);
               if (raw.picture) {
                   // Get image from raw profile
                   $scope.imageUrl = raw.picture;
               } else {
                   // Get image from gravatar
                   $scope.imageUrl = $gravatarService.getProfileImageUrl(profile.emails[0].value);
               }
           }
       });
    }]);
});