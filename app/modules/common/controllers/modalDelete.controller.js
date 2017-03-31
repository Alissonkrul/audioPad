'use strict';
angular.module('common')
  .controller('AlertDeleteController', alertDeleteController);

alertDeleteController.$inject = ['$scope', '$uibModalInstance', 'informationText'];

function alertDeleteController($scope, $uibModalInstance, informationText) {
  $scope.informationText = 'Are you sure about this ?';
  if (informationText)
    $scope.informationText = informationText;

  $scope.deleteConfirmation = function () {
    $uibModalInstance.close();
  };
  $scope.cancel = function () {

    $uibModalInstance.dismiss('cancel');
  };
}

