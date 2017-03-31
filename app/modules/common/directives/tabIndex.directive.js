'use strict';
angular.module('common')
  .directive('tabIndex', [function () {
    return {
      restrict: 'A',
      controller: function () {
        this.elements = [];
      }
    };
  }])
  .directive('firstTabIndex', [function () {
    return {
      restrict: 'A',
      require: '^tabIndex',
      link: function (scope, element, attrs, ctrl) {
        var id = attrs.firstTabIndex || 'firstTabIndex';
        ctrl[id] = element;
        element.bind("keydown keypress", function (event) {
          var keyCode = event.which || event.keyCode;
          if (keyCode === 9 && event.shiftKey) { // 9 is tab key code
            var focusableElement = ctrl['_' + id];
            if (focusableElement) {
              focusableElement.focus();
              event.stopPropagation();
              event.preventDefault();
            }
          }
        });
      }
    };
  }])
  .directive('lastTabIndex', [function () {
    return {
      restrict: 'A',
      require: '^tabIndex',
      link: function (scope, element, attrs, ctrl) {
        var id = attrs.lastTabIndex || 'firstTabIndex';
        ctrl['_' + id] = element;
        element.bind("keydown keypress", function (event) {
          var keyCode = event.which || event.keyCode;
          if (keyCode === 9 && !event.shiftKey) { // 9 is tab key code
            var focusableElement = ctrl[id];
            if (focusableElement) {
              focusableElement.focus();
              event.stopPropagation();
              event.preventDefault();
            }
          }
        });
      }
    };
  }]);
