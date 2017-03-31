'use strict';
angular.module('common').directive('usDate', usDateDirective);

usDateDirective.$inject = ['$filter'];
function usDateDirective($filter) {

  function removeNonDigits(value) {
    return value ? value.replace(/[^0-9\/]/g, '').substr(0, 10) : '';
  }

  function applyMaskAllBrowsers(value) {
    /*jshint maxcomplexity:9999 */
    var formatedValue = String(value);

    if (formatedValue && !formatedValue.match(/\d{2}\/\d{2}\/\d{4}/)) {
      var unformatedValue = formatedValue.split('/');
      if (unformatedValue && unformatedValue.length > 2) {
        var firstDate = unformatedValue[0];
        if (firstDate.length === 1) {
          firstDate = '0' + firstDate;
        }
        var secondDate = unformatedValue[1];
        if (secondDate.length === 1) {
          secondDate = '0' + secondDate;
        }
        var thirdDate = unformatedValue[2];
        if (thirdDate.length === 1) {
          thirdDate = '200' + thirdDate;
        } else if (thirdDate.length === 2) {
          thirdDate = '20' + thirdDate;
        } else if (thirdDate.length === 3) {
          thirdDate = '2' + thirdDate;
        }

        formatedValue = (firstDate + '/' + secondDate + '/' + thirdDate);
      }
    }

    if (isNaN(new Date(formatedValue))) {
      return '';
    } else {
      return new Date(formatedValue);
    }
  }

  function applyDateMask(value) {
    var formatedValue;

    if (value instanceof Date) {
      formatedValue = $filter('date')(value, 'MM/dd/yyyy');

    } else {
      formatedValue = removeNonDigits(value) || '';
    }

    if (formatedValue.match(/[0-9]{6,8}/)) {
      var month = formatedValue.substring(0, 2);
      var day = formatedValue.substring(2, 4);
      var year = formatedValue.substring(4);

      formatedValue = month + '/' + day + '/' + year;
    }

    return formatedValue.trim().replace(/[^0-9\/]$/, '').replace(/\/\//, '/');
  }

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {

      element.bind('blur', function () {
        scope.$apply(function () {
          var dateObject = applyMaskAllBrowsers(ngModel.$modelValue);
          setView(dateObject);
          ngModel.$modelValue = dateObject;
        });
      });

      function formatter(value) {
        if (ngModel.$isEmpty(value)) {
          return value;
        }
        return applyDateMask(value);
      }

      function setView(formatedValue) {
        ngModel.$setViewValue(formatedValue);
        ngModel.$render();
      }

      function parser(value) {
        if (ngModel.$isEmpty(value)) {
          return value;
        }

        var formattedValue = applyDateMask(value);

        setView(formattedValue);

        return formattedValue;
      }

      ngModel.$formatters.push(formatter);
      ngModel.$parsers.push(parser);
    }
  };
}
