'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('initApp.services', ['LocalStorageModule', 'ngResource'])
.value('version', '0.1')
.service('checkins', function ($rootScope, $http) {
  return {
    photo: {},
    location: {},
    setLocation:function (location){
      this.location = location;
    },
    setPhoto: function(photo){
     this.photo = photo;
   },
   submit:function (callback){
     var img = document.createElement("img");
     img.src = this.photo;
     // Create an empty canvas element
     var canvas = document.createElement("canvas");
     canvas.width = img.width;
     canvas.height = img.height;
     // // Copy the image contents to the canvas
     var ctx = canvas.getContext("2d");
     ctx.drawImage(img, 0, 0);

     var dataURL = canvas.toDataURL("image/png");
     this.photo = dataURL;
     console.log(this.photo);
     var data = {
      photo: this.photo,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
    };

      //Submit to server OF COURSE!!
      var service ="yourserviceURL";
      $http.post(service, data).success(function(data) {
       callback();
     });


    },

  };
});

