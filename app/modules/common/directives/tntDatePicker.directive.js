'use strict';
angular.module('common')
  .directive('tntDatePicker', [function () {
    var all = [];

    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: 'modules/common/views/tntDatePicker.html',
      scope: {
        model: '=ngModel',
        tntRequired: '=tntRequired',
        ngDisabled: '=?tntDisabled',
        datepickerOptions:'=datepickerOptions'
      },
      controller: ['$scope', function ($scope) {

        all.push($scope);

        $scope.closeOthers = function (selfScope) {
          for (var i = 0; i < all.length; i++) {
            if (selfScope !== all[i]) {
              all[i].opened = false;
            }
          }
        };
      }],
      link: function (scope) {
        //remove warnings in console
        scope.datepickerOptions = scope.datepickerOptions ? scope.datepickerOptions : {minDate: null, maxDate: null};

        if (!scope.ngDisabled) {
          scope.ngDisabled = false;
        }
        scope.open = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();

          scope.model = !scope.model ? new Date() : scope.model;

          scope.opened = !scope.opened;
          scope.closeOthers(scope);

        };
      }
    };
  }]);
