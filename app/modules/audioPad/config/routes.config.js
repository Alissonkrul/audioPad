'use strict';

angular.module('audioPad').config(routesConfig);

routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function routesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      controller: 'MainCtrl as mainCtrl',
      templateUrl: 'modules/audioPad/views/main.html'
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/audioPad/views/403.html'
    })

}
