'use strict';
angular.module('common')
  .controller('ModalTwoOptionsController', modalTwoOptionsController);

modalTwoOptionsController.$inject = ['$scope', '$uibModalInstance', 'options'];

function modalTwoOptionsController($scope, $uibModalInstance, options) {
  if (!options)
    throw ('ModalTwoOptions need an options object to be passed');

  $scope.informationText = options.informationText;

  $scope.firstOptionLabel = options.firstOptionLabel;
  $scope.firstOptionIconClass = options.firstOptionIconClass;

  $scope.secondOptionLabel = options.secondOptionLabel;
  $scope.secondOptionIconClass = options.secondOptionIconClass;

  if (options.title)
    $scope.title = options.title;

  if (options.informationText)
    $scope.informationText = options.informationText;

  $scope.firstOptionAction = function () {

    if (options.firstOptionAction) options.firstOptionAction();

    if (options.firstOptionResolve) {
      $uibModalInstance.close();
    }
    else {
      $uibModalInstance.dismiss('cancel');
    }
  };
  $scope.secondOptionAction = function () {
    if (options.secondOptionAction) options.secondOptionAction();
    if (options.secondOptionResolve) {
      $uibModalInstance.close();
    }
    else {
      $uibModalInstance.dismiss('cancel');
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.close();
  };
}

