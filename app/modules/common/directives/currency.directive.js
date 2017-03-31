'use strict';
angular.module('common')
  .directive('currencyInput', currencyInputDirective);

currencyInputDirective.$inject = ['$filter', '$timeout'];
function currencyInputDirective($filter, $timeout) {
  return {
    scope: {
      amount: '=ngModel'
    },
    link: function (scope, el) {

      var watch = scope.$watch('amount', function () {
        $timeout(function () {
          el.val(el.val().replace(/[^0-9.]/g, ''));
          scope.amount = (scope.amount) ? scope.amount.replace(/[^0-9.]/g, '') : '';
          el.val($filter('currency')(scope.amount, ''));
        });
      });

      el.bind('input', function () {
        scope.amount = el.val();
        scope.$apply();
      });

      el.bind('blur', function () {
        el.val(el.val().replace(/[^0-9.]/g, ''));
        scope.amount = (scope.amount) ? scope.amount.replace(/[^0-9.]/g, '') : '';
        el.val($filter('currency')(scope.amount, ''));
      });

      el.bind('focus', function () {
        if (watch) {
          watch();
          watch = null;
        }
      });
    }
  };
}
