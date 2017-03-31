'use strict';
angular.module('audioPad')
  .service('ApiService', apiCommunicationService);

apiCommunicationService.$inject = ['$http', 'CurrentStateService', 'config'];

function apiCommunicationService($http, CurrentStateService, config) {
  var endpoint = config.online_db;
  var offEndpoint = config.offline_db;


  this.getData = function () {
    var url = endpoint + '/data';
    return $http.get(url)
      .then(function (response) {
        return response.data;
      });
  };

  this.saveData = function (data) {
    var url = endpoint + '/data';
    return $http.put(url, data)
      .then(function (response) {
        return response.data;
      });
  };

  this.getOffData = function () {
    var url = offEndpoint;
    return $http.get(url)
      .then(function (response) {
        return response.data;
      });
  };

  this.saveOffData = function (data) {
    var url = offEndpoint;
    return $http.put(url, data)
      .then(function (response) {
        return response.data;
      });
  };


}
