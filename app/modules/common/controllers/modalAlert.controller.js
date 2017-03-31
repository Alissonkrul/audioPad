'use strict';
angular.module('common')
  .controller('AlertInformationController', alertInformationController);

alertInformationController.$inject = ['$scope', '$uibModalInstance', 'informationText'];

function alertInformationController($scope, $uibModalInstance, informationText) {
  $scope.informationText = informationText;
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
