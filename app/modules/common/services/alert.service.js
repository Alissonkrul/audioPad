'use strict';
angular.module('common')
  .service('AlertService', alertService);

alertService.$inject = ['$uibModal'];

function alertService($uibModal) {

  this.alertInformation = function (informationText) {
    return $uibModal.open({
      animation: true,
      backdrop: 'static',
      templateUrl: 'modules/common/views/modalAlert.html',
      controller: 'AlertInformationController',
      size: 'sm',
      resolve: {
        informationText: function () {
          return informationText;
        }
      }
    });
  };

  this.alertTwoOptions = function (options) {
    return $uibModal.open({
      animation: true,
      backdrop: 'static',
      templateUrl: 'modules/common/views/modalTwoOptions.html',
      controller: 'ModalTwoOptionsController',
      size: 'md',
      resolve: {
        options: function () {
          return options;
        }
      }
    });
  };

  this.alertConfirm = function (informationText) {
    return $uibModal.open({
      animation: true,
      backdrop: 'static',
      templateUrl: 'modules/common/views/modalConfirm.html',
      controller: 'AlertConfirmController',
      size: 'sm',
      resolve: {
        informationText: function () {
          return informationText;
        }
      }
    });
  };

  this.alertDelete = function (informationText) {
    return $uibModal.open({
      animation: true,
      backdrop: 'static',
      templateUrl: 'modules/common/views/modalDelete.html',
      controller: 'AlertDeleteController',
      size: 'sm',
      resolve: {
        informationText: function () {
          return informationText;
        }
      }
    });
  }
}
