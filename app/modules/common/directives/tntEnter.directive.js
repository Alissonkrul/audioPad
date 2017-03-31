'use strict';
angular.module('common').directive('tntEnter', tntEnterDirective);

tntEnterDirective.$inject = [];
function tntEnterDirective() {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      var keyCode = event.which || event.keyCode;
      if (keyCode === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.tntEnter);
        });
        event.preventDefault();
      }
    });
  };
}
