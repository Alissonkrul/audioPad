'use strict';
angular.module('common')
  .controller('AlertConfirmController', alertConfirmController);

alertConfirmController.$inject = ['$scope', '$uibModalInstance', 'informationText'];

function alertConfirmController($scope, $uibModalInstance, informationText) {

  $scope.informationText = informationText;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {

    $uibModalInstance.dismiss('cancel');
  };

}
