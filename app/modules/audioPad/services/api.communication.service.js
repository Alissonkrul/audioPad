'use strict';
angular.module('audioPad')
  .service('ApiService', apiCommunicationService);

apiCommunicationService.$inject = ['$http', 'CurrentStateService', 'config'];

function apiCommunicationService($http, CurrentStateService, config) {
  var endpoint = config.endpoint;


  this.getMetaData = function (jwt) {
    var url = endpoint + '/me';
    return $http.get(url)
      .then(function (response) {
        return response.data;
      });
  };

  this.postTestTemplate = function (testTemplate, params) {
    var url = endpoint + '/templates';
    return $http({
      url: url,
      method: 'POST',
      data: testTemplate,
      params: params
    });
  };

  this.getQuestions = function (params) {
    var url = endpoint + '/questions';

    params.navFilter = CurrentStateService.questionParams.navFilter;
    CurrentStateService.lastParams = params;

    return $http.get(url, {params: params})
      .then(function (response) {
        return response.data;
      });
  };

  this.setAnswer = function (body, params) {
    var url = endpoint + '/answers';
    return $http({
      url: url,
      method: "POST",
      data: body,
      params: params
    });
  };

  this.resetAnswers = function (params) {
    ///answers?memberUID=11074&testUID=1823819
    var url = endpoint + '/answers';
    return $http({
      url: url,
      method: 'DELETE',
      params: params
    });
  };

  this.resetWrongAnswers = function (params) {
    ///answers?memberUID=11074&testUID=1823819
    var url = endpoint + '/resetWrongAnswers';
    return $http({
      url: url,
      method: 'PUT',
      params: params
    });
  };

  this.finishTest = function (memberUID) {
    var url = endpoint + '/testDone';
    return $http({
      url: url,
      method: 'POST',
      params: {
        testUID: CurrentStateService.questionParams.testUID,
        memberUID: memberUID
      }
    })
  }
}
