'use strict';

angular.module('audioPad')
  .controller('MainCtrl', mainController);

mainController.$inject = ['$location', '$state', '$interval', '$scope', 'CurrentStateService', 'notify', 'hotkeys', 'ApiService'];
function mainController($location, $state, $interval, $scope, CurrentStateService, notify, hotkeys, ApiService) {


  var init = function () {
    ApiService.getOffData().then(function (test) {
      console.log(test);
    });
    ApiService.saveOffData({"lol":"changed"})
  };

  init();
}
