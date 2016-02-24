(function () {
  'use strict';

  angular.module('client')
    .factory('JobsService', function ($http, API_URL) {

      return {
        getJobs: function () {

          var url = API_URL + 'jobs';
          console.log("--- Search url: " + url);

          return $http.get(url)
            .then(function(response){
              //console.log('jobs', response.data);
              return response.data;
            });

        },

        getJob: function (id) {

          var url = API_URL + 'job/' + id;
          console.log("--- Search url: " + url);

          return $http.get(url)
            .then(function(response){
              console.log('jobs', response.data);
              return response.data;
            });

        }


      };
    });

})();