'use strict';
var initApp = angular.module('initApp.controllers',  ['LocalStorageModule']);

initApp.controller('deviceController', function ($scope, geolocation, camera, checkins) {



  $scope.refreshLocation = function() {
   geolocation.getCurrentPosition(function (position) {
     $scope.position = position;
     $scope.map = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +
     position.coords.longitude + "&zoom=20&size=300x200&markers=color:blue|label:S|" +
     position.coords.latitude + ',' + position.coords.longitude;
     checkins.setLocation(position.coords);
   });
 };
 $scope.refreshLocation();




 $scope.takepic = function() {
  camera.getPicture(function (image) {
    $scope.photo = image;
    checkins.setPhoto(image);
  });
};

$scope.submit = function() {
  checkins.submit(function() {
      $scope.ready = true;
  });
};




});
