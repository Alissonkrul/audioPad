'use strict';
angular.module('common').directive('autoFocus', autoFocusDirective);

autoFocusDirective = ['$timeout'];
function autoFocusDirective($timeout) {
  var elements = [];
  return {
    link: function (scope, element) {

      elements.push(element);

      scope.$on('$destroy', function () {
        var idx = elements.indexOf(element);
        if (idx >= 0) {
          elements.splice(idx, 1);
          $timeout(function () {
            if (elements.length > 1) {
              elements[elements.length - 1].focus();
            }
          });
        }
      });

      scope.$watch(function () {
        return element.is(":visible");
      }, function (value) {
        if (value) {
          $timeout(function () {
            element.focus();
          });
        }
      });
    }
  };
}
